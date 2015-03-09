/**
 * Module dependencies.
 */

var express = require('express');
var config = require('lib/config');
var api = require('lib/db-api');
var restrict = require('lib/utils').restrict;
var Manager = require('lib/machinepack-democracyosmanager');
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
  Manager.createInstance({
    url: config.manager.url,
    access_token: config.manager.token,
    instance: {
      name: req.body.name,
      title: req.body.title,
      owner: req.user.id,
      summary: 'A long description about the implementation of democracy on Mars.'
    }
  }).exec({
    error: function(){
      _handleError('Sorry, there was an unexpected error. Try again later please.', req, res);
    },

    serverError: function(){
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
