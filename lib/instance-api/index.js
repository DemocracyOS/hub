/**
 * Module dependencies.
 */

var express = require('express');
var config = require('lib/config');
var api = require('lib/db-api');
var restrict = require('lib/utils').restrict;
var Manager = require('machinepack-democracyosmanager');
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
  api.instance.findByOwner(req.user.id, function(err, instances) {
    if (err) return _handleError(err, req, res);

    return res.status(200).json(instances);
  });
});

app.post('/', restrict, function(req, res, next) {
  var data = {
    url: config.manager.url,
    access_token: config.manager.token,
    name: req.body.name,
    title: req.body.title,
    owner: req.user._id.toString(),
    summary: req.body.summary,
  };

  log('Trying to create instance: %o', data);

  Manager.createInstance(data).exec({
    error: function(err){
      log('Error found: %j', err);
      _handleError('Sorry, there was an unexpected error. Try again later please.', req, res);
    },

    serverError: function(err){
      log('Error found: %j', err);
      _handleError('Sorry, there was an error. Try again later please.', req, res);
    },

    badRequest: function(err){
      var e = err.err.msg ? err.err.msg : err.err.message
      _handleError(e || 'badRequest', req, res);
    },

    success: function(instance){
      res.status(200).json(instance);
    }
  });
});

app.delete('/:id', restrict, function(req, res, next) {

  api.instance.findById(req.params.id, function(err, instance) {
    if (err) return _handleError(err, req, res);
    if (!instance) return _handleError('The user doesnt have any instance.', req, res);

    log('Trying to delete instance: %o', instance);

    Manager.deleteInstance({
      url: config.manager.url,
      access_token: config.manager.token,
      name: instance.name
    }).exec({
      error: function(err){
        log('Error found: %j', err);
        _handleError('Sorry, there was an unexpected error. Try again later please.', req, res);
      },

      serverError: function(err){
        log('Error found: %j', err);
        _handleError('Sorry, there was an error. Try again later please.', req, res);
      },

      badRequest: function(err){
        var e = err.err.msg ? err.err.msg : err.err.message
        _handleError(e || 'badRequest', req, res);
      },

      success: function(){
        res.status(200);
      }
    });
  })

});

app.get('/exists', function(req, res, next) {
  api.instance.exists(req.query.name, function(err, exists) {
    if (err) return next(err);
    return res.status(200).json({ exists: exists });
  });
});


/**
 * Helper functions
 */

function _handleError (err, req, res) {
  log('Error found: %s', err);
  var error = err;
  if (err.errors && err.errors.text) error = err.errors.text;
  if (error.type) error = error.type;

  res.status(400).json({ error: error });
}
