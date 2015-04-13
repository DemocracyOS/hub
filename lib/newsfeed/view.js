/**
 * Module dependencies.
 */

var Card = require('./feed-card');
var deployment = require('deployment-model');
var DeploymentLink = require('./deployment-link.js');
var feeds = require('feeds');
var loading = require('loading-lock');
var request = require('request');
var template = require('./template');
var View = require('view');

function Newsfeed() {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed();
  }

  this.page = 0;
  View.call(this, template);

  this.loadDeploymentLink();
}

/**
 * Inherit from View
 */

View(Newsfeed);

/**
 * Switch on
 */

Newsfeed.prototype.switchOn = function switchOn() {
  this.bind('click', '.load-more', this.bound('more'));
}

/**
 * Fill feeds
 */

Newsfeed.prototype.fill = function fill() {
  var self = this;
  var el = this.find('.loading-container');
  el.removeClass('hide');
  var locker = loading(el[0], { size: 200 });
  locker.lock();

  feeds.fetch(null, this.page);

  feeds.once('fetch', function (feeds) {
    locker.unlock();
    self.page++;

    var last = feeds.length && feeds[feeds.length - 1].id;

    if (self.lastFeed === last) {
      feeds = [];
    }

    feeds.forEach(function (feed) {
      el.addClass('hide');
      var card = new Card(feed);
      self.find('.feeds').append(card.el);
    });

    if (feeds.length) {
      self.lastFeed = last;
      self.find('.load-more').removeClass('hide');
    } else {
      self.find('.load-more').addClass('hide');
      self.find('.loading-container').remove();
      self.find('.nothing').removeClass('hide');
    }
  });
}

/**
 * Load 'Create a Democracy' Button
 */

Newsfeed.prototype.loadDeploymentLink = function loadDeploymentLink() {
  var profile = this.find('.newsfeed.start');
  var deploymentLink = new DeploymentLink(deployment);
  deploymentLink.appendTo(profile);
}

/**
 * Load more feeds
 */

Newsfeed.prototype.more = function more() {
  this.fill();
}

/**
 * Expose View
 */

module.exports = Newsfeed;
