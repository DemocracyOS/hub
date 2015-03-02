/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var o = require('dom');
var title = require('title');
var feeds = require('feeds');
var Newsfeed = require('./view');
var t = require('t');

page('/', user.optional, feeds.middleware, function(ctx, next) {
  title(t('newsfeed.title'));

  var section = o('section.site-content').empty();
  var newsfeed = new Newsfeed(feeds.items);
  newsfeed.user = ctx.user;
  newsfeed.appendTo(section[0]);
});
