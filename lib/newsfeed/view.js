/**
 * Module dependencies.
 */

var Card = require('./feed-card');
var deployment = require('deployment-model');
var DeploymentLink = require('./deployment-link.js');
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
  var el = this.find('.loading-container');
  el.removeClass('hide');
  var locker = loading(el[0], { size: 200 });
  locker.lock();

  request
    .get('/api/feeds/all')
    .query({page: this.page})
    .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load feeds. Please try reloading the page. Thanks!';
      return log(message);
    };

    var feeds = res.body;

    if (!feeds.length) {
      this.find('.load-more').remove();
      if (this.page == 0 ) {
        return this.find('.nothing').removeClass('hide');
      } else {
        this.find('.nothing-else').removeClass('hide');
      }
    }

    feeds.forEach(eachfeed.bind(this));
  }

  function eachfeed(feed) {
    feed.url = feed.url.replace('http://', 'https://').replace(':80', '');

    request
      .get(feed.url + '/api/law/' + feed.data.law)
      .end(onfeed.bind(this));

    function onfeed(err, res) {
      if (err || !res.ok) {
        return log('Error found getting feed %s: %s', feed.id, err), callback(null, null);
      };

      var attrs = res.body;
      for (var prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
          feed[prop] = attrs[prop];
        }
      }

      el.addClass('hide');
      locker.unlock();
      var card = new Card(feed);
      this.find('.feeds').append(card.el);
      this.find('.load-more').removeClass('hide');
    }
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
 * Load more feeds
 */

Newsfeed.prototype.more = function more() {
  this.page++;
  this.fill();
}

/**
 * Expose View
 */

module.exports = Newsfeed;
