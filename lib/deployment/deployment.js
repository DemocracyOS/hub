/**
 * Module dependencies.
 */

var config = require('config');
var page = require('page');
var user = require('user');
var o = require('dom');
var deploymentForm = require('./view');
var maintenance = require('maintenance-view');
// var Success = require('./success-view');
var title = require('title');
var t = require('t');

page('/deployments/new', user.required, maintenance.middleware, function(ctx, next) {
  title(t('deployment.new.title'));

  var section = o('section.site-content').empty();
  o('body').addClass('deployment-new');
  var deployment = new deploymentForm();
  deployment.appendTo(section[0]);
});
