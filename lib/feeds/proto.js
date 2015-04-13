/**
 * Module dependencies.
 */

var request = require('request');
var render = require('render');
var Stateful = require('stateful');
var parallel = require('async').parallel;
var log = require('debug')('hub:feeds-proto');

/**
 * Expose `Feeds` proto constructor
 */

module.exports = Feeds;

/**
 * Feeds collection constructor
 */

function Feeds() {
  if (!(this instanceof Feeds)) {
    return new Feeds();
  };

  this.items = [];

  // instance bindings
  this.middleware = this.middleware.bind(this);
  this.fetch = this.fetch.bind(this);

  this.state('initializing');
  this.fetch();
}

/**
 * Mixin Feeds prototype with Emitter
 */

Stateful(Feeds);

/**
 * Fetch `feeds` from source
 *
 * @param {String} src
 * @api public
 */

Feeds.prototype.fetch = function(src, page) {
  log('request in process');
  src = src || '/api/feeds/all';
  var self = this;

  this.state('loading');

  request
  .get(src)
  .query({page: page || 0})
  .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load feeds. Please try reloading the page. Thanks!';
      return this.error(message);
    };

    var tasks = [];
    res.body.forEach(function (feed) {
      feed.url = feed.url.replace('http://', 'https://').replace(':80', '');
      tasks.push(function (callback) {
        request
        .get(feed.url + '/api/law/' + feed.data.law)
        .end(onfeed);

        function onfeed(err, res) {
          if (err || !res.ok) {
            return log('Error found getting feed %s: %s', feed.id, err), callback(null, null);
          };

          var attrs = res.body;
          for (var prop in attrs) {
            if (attrs.hasOwnProperty(prop)) {
              feed[prop] = attrs[prop];
            }
          }
          callback(null, feed);
        }
      })
    });

    parallel(tasks, function (err, results) {
      if (err) {
        return self.error(err);
      }

      function notempty(result) {
        return !!result;
      }

      results = results.filter(notempty);
      self.add(results);
      self.emit('fetch', results);
    });
  }
}

/**
 * Set items to `v`
 *
 * @param {Array} v
 * @return {Feeds} Instance of `Feeds`
 * @api public
 */

Feeds.prototype.set = function(v) {
  this.items = v;
  this.state('loaded');
  return this;
}

/**
 * Set items to `v`
 *
 * @param {Array} v
 * @return {Feeds} Instance of `Feeds`
 * @api public
 */

Feeds.prototype.add = function(v) {
  this.items = this.items.concat(v);
  this.state('loaded');
  return this;
}

/**
 * Get current `items`
 *
 * @return {Array} Current `items`
 * @api public
 */

Feeds.prototype.get = function() {
  return this.items;
}

/**
 * Middleware for `page.js` like
 * routers
 *
 * @param {Object} ctx
 * @param {Function} next
 * @api public
 */

Feeds.prototype.middleware = function(ctx, next) {
  this.ready(next);
}

/**
 * Handle errors
 *
 * @param {String} error
 * @return {Feeds} Instance of `Feeds`
 * @api public
 */

Feeds.prototype.error = function(message) {
  // TODO: We should use `Error`s instead of
  // `Strings` to handle errors...
  // Ref: http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
  this.state('error', message);
  log('error found: %s', message);

  // Unregister all `ready` listeners
  this.off('ready');
  return this;
}
