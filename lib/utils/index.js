/**
 * Extend module's NODE_PATH
 * HACK: temporary solution
 */

require('node-path')(module);

/**
 * Module dependencies.
 */

var config = require('lib/config');
var has = Object.prototype.hasOwnProperty;
var crypto = require('crypto');
var log = require('debug')('hub:utils');

/**
 * HOP ref.
 */

exports.has = has;

/**
 * MD5 hash generator.
 *
 * @param {String} string String to encrypt.
 * @return {String} MD5 encrypted string.
 * @api public
 */

exports.md5 = function md5(string) {
  return crypto.createHash('md5').update(string).digest("hex");
}

/**
 * Basic access restriction middleware
 * for authenticated users.
 */

exports.restrict = function restrict(req, res, next) {
  log('Checking for logged in citizen');

  if (req.user) {
    log('Citizen logged in, moving on...')
    next();
  } else {
    log('Citizen is not logged in. Path %s is restricted.', req.path);
    // we should actually redirect
    // to a login page...
    res.format({
      html: function () {
        //TODO: update this with new credential system
        res.send(403);
      },
      json: function() {
        res
        .status(403)
        .json({
          error: 'Forbidden access',
          action: {
            redirect: '/login'
          }
        })
      }
    });
  }
};

/**
 * Maintenance checking
 */

exports.maintenance = function maintenance(req, res, next) {
  log('Checking if maintenance mode: on');

  if (config.maintenance) {
    res.sendStatus(503);
  } else {
    next();
  }
};

/**
 * Applies a mapping method for citizen's
 * considering some keys for an object item
 *
 * @param {String} keys
 * @return {Function} map function for `Array.prototype.map`
 * @api public
 */

exports.expose = function expose(keys) {
  keys = keys.split(' ');

  return function(item) {
    var ret = {};

    keys.forEach(function(key) {
      var segments = exports.sanitize(key).split('.');
      var cursor = ret;
      segments.forEach(function(s, i) {
        if (segments.length - 1 > i) cursor = cursor[s] = cursor[s] || {};
        else cursor[s] = exports.get(key, item);
      });
    });

    return ret;
  }
}

/**
 * Map array of objects by `property`
 *
 * @param {Array} source array of objects to map
 * @param {String} property to map from objects
 * @return {Array} array of listed properties
 * @api private
 */

exports.pluck = function pluck(source, property) {
  return source.map(function(item) { return item[property]; });
};

/**
 * Get Object's path value
 *
 * @param {String} path
 * @param {Object} obj
 * @return {Mixed}
 * @api public
 */

exports.get = function get(path, obj) {
  return new Function('_', 'return _.' + path)(obj);
}

/**
 * sanitizes some `key`'s name for propper
 * object definition
 *
 * @param {String} key
 * @return {String} sanitized key
 * @api public
 */

exports.sanitize = function sanitize(key) {
  var methods = /\(.*\)/g;
  var chars = /[^a-zA-Z_\.]/g;
  return key.replace(methods, '').replace(chars, '');
}
