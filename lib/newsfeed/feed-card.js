/**
 * Module dependencies.
 */

var o = require('dom');
var template = require('./feed-card-template');
var View = require('view');
var trimHtml = require('trim-html');

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
  this.feed.paragraphs = [];

  if ((type == 'law-published' || type == 'law-voted') && this.feed.summary) {
    var summary = o(this.feed.summary);
    var image = o('img', summary);
    if (image.length) {
      this.feed.image = image.first().attr('src');
    }
    o('br', summary).remove();
    o('img', summary).remove();
    var paragraphs = o('div', summary);
    if (!paragraphs.length) paragraphs = summary;

    function notempty(text) {
      return text;
    }

    function getText(el) {
      var el = o(el);
      el.find('*').style(null);
      return el.html();
    }

    function wrapWithP(el) {
      return '<p>' + el + '</p>';
    }

    paragraphs = paragraphs.map(getText).toArray().filter(notempty).map(wrapWithP).join('');

    this.feed.paragraphs = trimHtml(paragraphs, { limit: 450 });
  }
}

/**
 * Expose View
 */

module.exports = FeedCard;
