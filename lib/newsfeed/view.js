/**
 * Module dependencies.
 */

var template = require('./template');
var user = require('user');
var StartDemocracy = require('./start-democracy');
var View = require('view');

function Newsfeed(feeds) {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed(feeds);
  }

  View.call(this, template, { feeds: feeds });

  var start = new StartDemocracy();
  start.replace(this.find('.start-democracy-container'));
}

/**
 * Inherit from View
 */

View(Newsfeed);

/**
 * Expose View
 */

module.exports = Newsfeed;
