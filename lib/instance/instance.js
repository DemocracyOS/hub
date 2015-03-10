/**
 * Module dependencies.
 */

var page = require('page');
var user = require('user');
var o = require('dom');
var InstanceForm = require('./view');
// var Success = require('./success-view');
var title = require('title');
var t = require('t');

page('/instances/new', user.required, function(ctx, next) {
  title(t('instance.new.title'));

  var section = o('section.site-content').empty();
  o('body').addClass('instance-new');
  var instance = new InstanceForm();
  instance.appendTo(section[0]);
});

// page('/instances/new/success/:id', function(ctx, next) {
//   title(t('instance.success.title'));
//
//   var section = o('section.site-content').empty();
//   var success = new Success(ctx);
//   success.appendTo(section[0]);
// });