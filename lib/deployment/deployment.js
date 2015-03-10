/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var o = require('dom');
var deploymentForm = require('./view');
// var Success = require('./success-view');
var title = require('title');
var t = require('t');

page('/deployments/new', user.required, function(ctx, next) {
  title(t('deployment.new.title'));

  var section = o('section.site-content').empty();
  o('body').addClass('deployment-new');
  var deployment = new deploymentForm();
  deployment.appendTo(section[0]);
});

// page('/deployments/new/success/:id', function(ctx, next) {
//   title(t('deployment.success.title'));
//
//   var section = o('section.site-content').empty();
//   var success = new Success(ctx);
//   success.appendTo(section[0]);
// });