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

page('/', user.optional, function(ctx) {
  title(t('newsfeed.title'));

  var section = o('section.site-content').empty();
  var newsfeed = new Newsfeed();
  o('body').addClass('newsfeed');
  newsfeed.user = ctx.user;
  newsfeed.appendTo(section[0]);
  newsfeed.fill();
});
