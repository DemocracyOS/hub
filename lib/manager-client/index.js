/**
 * Module dependencies.
 */

var api = require('lib/db-api');

module.exports = function create(data, fn) {
  if (data.owner.instances) return fn('User cannot have more than one instance');

  api.user.exists(data.username, function (err, exists) {
    if (exists) return fn(new Error('The URL is in use'));

    api.instance.create(data, function(err, instance) {
      if (err) return fn(err);

      api.user.updateUsername(data.owner.id, data.username, function(err, user) {
        if (err) {
          api.instance.delete(data.id, function(deleteError) {
            if (deleteError) return fn(new Error('Error during instance rollback. Instance id: %s. Original error: %s', instance.id, err));

            return fn(err);
          });
        }

        return fn(null, instance);
      });
    });
  });
}
