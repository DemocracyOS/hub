/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Deployment = mongoose.model('Deployment');
var log = require('debug')('hub:db-api:deployment');

exports.all = function all(fn) {
  log('Looking for all deployments');

  Deployment
  .find({ deleted: false })
  .populate('owner')
  .select('id title summary url owner imageUrl')
  .exec(function(err, deployments) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    log('Delivering deployments %j', deployments);

    fn(null, { deployments: deployments });
  });

  return this;
};

exports.findByOwner = function findByOwner(owner, fn) {
  log('Searching for deployments whose owner is %s', owner);

  Deployment.find({ deleted: false, owner: owner })
  .exec(function(err, deployments) {
    if (err) {
      log('Found error: %j', err);
      return fn(err);
    }

    log('Found %d deployments', deployments.length)
    fn(null, deployments);
  });

  return this;
};

exports.findOneByOwner = function findOneByOwner(owner, fn) {
  log('Searching deployment of owner %s', owner);

  Deployment
  .where({ deleted: false, owner: owner })
  .findOne(function(err, deployment) {
    if (err) {
      log('Found error: %j', err);
      return fn(err);
    }

    if (deployment) log('Found deployment %s of %s', deployment.name, owner);
    else log('Not Found deployment of %s', owner);

    fn(null, deployment);
  });

  return this;
};

exports.findById = function findById(id, fn) {
  log('Searching for deployment with id %s', id);

  Deployment.findById(id, function(err, deployment) {
    if (err) {
      log('Found error: %j', err);
      return fn(err);
    } else if (!deployment) {
      log('No deployment found with id %s', id);
      return fn();
    }

    log('Found deployment %s', deployment.id)
    fn(null, deployment);
  });

  return this;
};


exports.count = function find(query, fn) {
  query.deleted = false;
  Deployment.count(query).exec(fn);
};

exports.exists = function exists(name, fn) {
  name = normalize(name);
  Deployment.findOne({ name: name }, function(err, deployment) {
    return err ? fn(err) : fn(null, !!deployment);
  });
};

function normalize(str) {
  return str.trim().toLowerCase();
}
