/**
 * Module dependencies.
 */

var template = require('./template');
var user = require('user');
var View = require('view');

function Newsfeed() {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed();
  }

  View.call(this, template)
}

/**
 * Inherit from View
 */

View(Newsfeed);

/**
 * Expose View
 */

module.exports = Newsfeed;
