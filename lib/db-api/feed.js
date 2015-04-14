/**
 * Module dependencies.
 */

var config = require('lib/config');
var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var User = mongoose.model('User');
var log = require('debug')('hub:db-api:feed');

exports.all = function all(query, fn) {
  log('Looking for all feeds');

  var page = query.page || 0;
  var limit = config('feed limit') || null;

  Feed
  .find()
  .select('id type url data feededAt')
  .sort('-feededAt')
  .skip(page * limit)
  .limit(limit)
  .exec(function(err, feeds) {
    if (err) {
      log('Found error: %s', err);
      return fn(err);
    }

    User.populate(feeds, { path: 'data.user' }, function (err, feeds) {
      if (err) return log('Found error: populating feed user %s', err), fn(err);
      feeds.forEach(function(feed) {
        feed.data.user.profilePictureUrl = feed.data.user.profilePictureUrl || feed.data.user.gravatar({ default: 'mm', secure: true });
      });

      log('Populated user on feeds %j', feeds);
      fn(null, feeds);
    })
  });

  return this;
};
