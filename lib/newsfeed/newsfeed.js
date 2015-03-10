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
var request = require('request');

page('/', user.optional, loadDeployment, feeds.middleware, function(ctx, next) {
  title(t('newsfeed.title'));

  var section = o('section.site-content').empty();
  var newsfeed = new Newsfeed(feeds.items, ctx.deployment);
  o('body').addClass('newsfeed');
  newsfeed.user = ctx.user;
  newsfeed.appendTo(section[0]);
});

function loadDeployment(ctx, next){
  if (!ctx.user) return next();

  request
    .get('/deployments/mine')
    .set('Accept', 'application/json')
    .end(function(err, res){
      var deployment = res.body && res.body.length && res.body[0];
      if (deployment) ctx.deployment = deployment;
      next();
    })
}
