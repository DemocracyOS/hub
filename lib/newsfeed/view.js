/**
 * Module dependencies.
 */

var Card = require('./feed-card')
var template = require('./template');
var View = require('view');

function Newsfeed(feeds, deployment) {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed(feeds, deployment);
  }

  this.feeds = feeds;
  View.call(this, template, { deployment: deployment });

  this.fill();
}

/**
 * Inherit from View
 */

View(Newsfeed);

/**
 * Fill feeds
 */

Newsfeed.prototype.fill = function fill() {
  this.feeds.forEach(eachfeed.bind(this));

  function eachfeed(feed) {
    var card = new Card(feed);
    this.find('.feeds').append(card.el);
  }
}

/**
 * Expose View
 */

  module.exports = Newsfeed;
