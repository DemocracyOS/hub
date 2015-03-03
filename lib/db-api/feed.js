/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var log = require('debug')('hub:db-api:feed');

exports.all = function all(fn) {
  log('Looking for all feeds');

  Feed
  .find()
  .select('id law url')
  .exec(function(err, feeds) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    log('Delivering feeds %j', feeds);
    fn(null, feeds);
  });

  return this;
};
