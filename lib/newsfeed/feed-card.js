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
  var type = this.feed.type;
  if (type == 'law-published' || type == 'law-voted') {
    var summary = o(this.feed.summary);
    var image = o('img', summary);
    if (image.length) {
      this.feed.image = image.first().attr('src');
    }
    o('br', summary).remove();
    o('img', summary).remove();
    var paragraphs = o('div', summary);
    if (!paragraphs.length) paragraphs = summary;

    function notempty(el) {
      return o(el).html() != '';
    }

    function html(el) {
      return o(el).html();
    }

    function unstyle(el) {
      el = o(el).style(null);
      var inside = o('*', el);
      if (inside.length) unstyle(inside);
      return o(el);
    }

    this.feed.paragraphs = paragraphs.filter(notempty).map(unstyle).map(html);
  }
}

/**
 * Expose View
 */

module.exports = FeedCard;
