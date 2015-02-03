/**
 * Module dependencies.
 */

var express = require('express');
var config = require('lib/config');
var api = require('lib/db-api');
var restrict = require('lib/utils').restrict;
var log = require('debug')('hub:instance');

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Define routes for Dashboard module
 */

app.get('/', function(req, res, next) {
  api.instance.all(function(err, instances) {
    if (err) return _handleError(err, req, res);
    return res.status(200).json(instances);
  });
});

app.get('/mine', restrict, function(req, res, next) {
  api.instance.all(function(err, instances) {
    if (err) return _handleError(err, req, res);

    instances = instances.filter(function(instance) {
      return instance.owner.toString() == req.user.id;
    });

    return res.status(200).json(instances);
  });
});

app.post('/', restrict, function(req, res, next) {
  if (req.user.instances) return res.status(400).json({ error: 'User cannot have more than one instance' });

  api.user.exists(req.body.username, function (err, exists) {
    if (exists) return res.status(400).json({ error: 'The URL is in use' });

    var data = {
      title: req.body.title,
      summary: req.body.summary,
      url: req.body.username + '.democracyos.com',
      owner: req.user,
      imageUrl: req.image
    };

    // TODO: invoke manager api to spawn new instance

    api.instance.create(data, function(err, instance) {
      if (err) return _handleError(err, req, res);

      api.user.updateUsername(req.user.id, req.body.username, function(err, user) {
        if (err) {
          api.instance.delete(data.id, function(deleteError) {
            if (deleteError) _handleError(new Error('Error during instance rollback. Instance id: %s. Original error: %s', instance.id, err), req, res);
            return _handleError(err, req, res);
          });
        }

        res.status(200).json(instance);
      });
    });
  });
});

/**
 * Helper functions
 */

function _handleError (err, req, res) {
  log("Error found: %s", err);
  var error = err;
  if (err.errors && err.errors.text) error = err.errors.text;
  if (error.type) error = error.type;

  res.json(400, { error: error });
}