/**
 * Module dependencies.
 */

var Card = require('./feed-card');
var deployment = require('deployment-model');
var DeploymentLink = require('./deployment-link.js');
var template = require('./template');
var View = require('view');

function Newsfeed(feeds) {
  if (!(this instanceof Newsfeed)) {
    return new Newsfeed(feeds);
  }

  this.feeds = feeds;
  View.call(this, template);

  this.fill();
  this.loadDeploymentLink();
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
 * Load 'Create a Democracy' Button
 */

Newsfeed.prototype.loadDeploymentLink = function loadDeploymentLink() {
  var profile = this.find('.newsfeed.start');
  var deploymentLink = new DeploymentLink(deployment);
  deploymentLink.appendTo(profile);
}

/**
 * Expose View
 */

module.exports = Newsfeed;
