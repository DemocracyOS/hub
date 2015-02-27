/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var o = require('dom');
var title = require('title');
var Newsfeed = require('./view');
var t = require('t');

page('/', user.optional, function(ctx, next) {
  title(t('newsfeed.title'));

  var section = o('section.site-content').empty();
  var newsfeed = new Newsfeed();
  newsfeed.user = ctx.user;
  newsfeed.appendTo(section[0]);
});
