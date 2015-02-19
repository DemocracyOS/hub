/**
 * Module dependencies.
 */

var api = require('lib/db-api');
// var MockRequest = require('node-http-request-mock');

module.exports = function create(data, fn) {
  if (data.owner.instances) return new Error('User cannot have more than one instance');

  api.user.exists(data.username, function (err, exists) {
    if (exists) return new Error('The URL is in use');

    api.instance.create(data, function(err, instance) {
      if (err) return err;

      api.user.updateUsername(data.owner.id, data.username, function(err, user) {
        if (err) {
          api.instance.delete(data.id, function(deleteError) {
            if (deleteError) return new Error('Error during instance rollback. Instance id: %s. Original error: %s', instance.id, err);

            return err;
          });
        }

        return fn(null, instance);
      });
    });
  });
}
