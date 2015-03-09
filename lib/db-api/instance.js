/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Instance = mongoose.model('Instance');
var log = require('debug')('hub:db-api:instance');

exports.all = function all(fn) {
  log('Looking for all instances');

  Instance
  .find({ deletedAt: null })
  .populate('owner')
  .select('id title summary url owner imageUrl')
  .exec(function(err, instances) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    log('Delivering instances %j', instances);

    Instance.findOne({ deletedAt: null }).exec(function(err, instance) {
      if (err) return log('Found error: %s', err), fn(err);
      fn(null, { instances: instances });
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

exports.count = function find(query, fn) {
  Instance.count(query).exec(fn);
};

exports.exists = function exists(name, fn) {
  name = normalize(name);
  Instance.findOne({ name: name }, function(err, instance) {
    return err ? fn(err) : fn(null, !!instance);
  });
};

function normalize(str) {
  return str.trim().toLowerCase();
}
