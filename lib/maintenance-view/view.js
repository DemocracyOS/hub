/*
 * Module dependencies.
 */

var config = require('config');
var o = require('dom');
var page = require('page');
var t = require('t');
var template = require('./template');
var title = require('title');
var View = require('view');

/**
 * Expose MaintenanceView.
 */
module.exports = MaintenanceView;

/**
 * MaintenanceView
 *
 * @return {MaintenanceView} `MaintenanceView` deployment.
 * @api public
 */

function MaintenanceView () {
  if (!(this instanceof MaintenanceView)) {
    return new MaintenanceView();
  }

  View.call(this, template);
}

/**
 * Inherit from `View`
 */

View(MaintenanceView);

MaintenanceView.middleware = function maintenance(ctx, next) {
  // if (config.maintenance) {
  //   title(t('maintenance.title'));
  //
  //   var section = o('section.site-content').empty();
  //   o('body').addClass('maintenance');
  //   var maintenance = new MaintenanceView();
  //   maintenance.appendTo(section[0]);
  // } else {
    next();
  // }
}
