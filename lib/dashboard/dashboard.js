/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var o = require('dom');
var title = require('title');
var Dashboard = require('./view');
var t = require('t');

page('/', user.optional, function(ctx, next) {
  title(t('dashboard.title'));

  var section = o('section.site-content').empty();
  var dashboard = new Dashboard();
  dashboard.user = ctx.user;
  dashboard.appendTo(section[0]);
});