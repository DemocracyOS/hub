/**
 * Module dependencies.
 */

var template = require('./feed-card-template');
var View = require('view');

function FeedCard(feed) {
  if (!(this instanceof FeedCard)) {
    return new FeedCard(feed);
  }

  View.call(this, template, { feed: feed });
}

/**
 * Inherit from View
 */

View(FeedCard);

/**
 * Expose View
 */

module.exports = FeedCard;
