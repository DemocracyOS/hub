/**
 * Module dependencies.
 */

var template = require('./template');
var user = require('user');
var View = require('view');

function Newsfeed(feeds) {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed(feeds);
  }

  View.call(this, template, { feeds: feeds });
}

/**
 * Inherit from View
 */

View(Newsfeed);

/**
 * Expose View
 */

module.exports = Newsfeed;
