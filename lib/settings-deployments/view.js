/**
 * Module dependencies.
 */

var View = require('view');
var log = require('debug')('democracyos:settings-deployments');
var render = require('render');
var DeploymentRow = require('./deployment-row-view');
var template = require('./template');
var button = require('./new-deployment-button');
var deployment = require('deployment-model');

/**
 * Expose DeploymentsView
 */

module.exports = DeploymentsView;

/**
 * Creates a profile edit view
 */

function DeploymentsView() {
  if (!(this instanceof DeploymentsView)) {
    return new DeploymentsView();
  }

  View.call(this, template);

  this.load();
}

/**
 * Mixin with `Emitter`
 */

View(DeploymentsView);


DeploymentsView.prototype.load = function load() {
  var self = this;
  deployment.onLoaded(function(){
    if (deployment.status() === 'non-existent') {
      self.find('.deployments').append(render(button));
    }

    var row = new DeploymentRow(deployment);
    self.find('.deployments').append(row.el);
  });
}
