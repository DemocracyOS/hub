/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var User = mongoose.model('User');
var log = require('debug')('hub:db-api:feed');

exports.all = function all(fn) {
  log('Looking for all feeds');

  Feed
  .find()
  .select('id type url data feededAt')
  .sort('-feededAt')
  .exec(function(err, feeds) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    User.populate(feeds, { path: 'data.user' }, function (err, feeds) {
      if (err) return log('Found error: populating feed user %s', err), fn(err);

      log('Populated user on feeds %j', feeds);
      fn(null, feeds);
    })
  });

  return this;
};
