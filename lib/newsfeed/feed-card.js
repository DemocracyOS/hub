/**
 * Module dependencies.
 */

var o = require('dom');
var template = require('./feed-card-template');
var View = require('view');

function FeedCard(feed) {
  if (!(this instanceof FeedCard)) {
    return new FeedCard(feed);
  }

  this.feed = feed;
  this.parse();
  View.call(this, template, { feed: this.feed });
}

/**
 * Inherit from View
 */

View(FeedCard);

/**
 * Parse embedded images
 */

FeedCard.prototype.parse = function parse() {
  if (this.feed.type == 'law-published') {
    var summary = o(this.feed.summary);
    var image = o('img', summary);
    if (image.length) {
      this.feed.image = image.first().attr('src');
    }
    o('br', summary).remove();
    o('img', summary).remove();
    var paragraphs = o('div', summary);

    function notempty(el) {
      return o(el).html() != '';
    }

    function html(el) {
      return o(el).html();
    }

    this.feed.paragraphs = paragraphs.filter(notempty).map(html);
  }
}

/**
 * Expose View
 */

module.exports = FeedCard;
