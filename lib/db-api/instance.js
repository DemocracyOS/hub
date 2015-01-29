/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Instance = mongoose.model('Instance');
var log = require('debug')('hub:db-api:instance');

exports.all = function all(user, fn) {
  log('Looking for all instances');

  Instance
  .find({ deletedAt: null })
  .select('id title summary url owner')
  .exec(function(err, instances) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    log('Delivering instances %j', instances);

    Instance.findOne({ deletedAt: null, owner: user._id.toString() }).exec(function(err, instance) {
      if (err) return log('Found error: %s', err), fn(err);
      if (instance) log('User already have an instance');
      else log('User doesn\'t have and instance');
      fn(null, { instances: instances, userHasInstance: !!instance });
    });
  });

  return this;
};

exports.create = function create(data, fn) {
  log('Creating new instance');

  var instance = new Instance(data);
  instance.save(onsave);

  function onsave(err) {
    if (err) return log('Found error: %s', err), fn(err);

    log('Saved instance with id %s', instance.id);
    fn(null, instance);
  }
};
