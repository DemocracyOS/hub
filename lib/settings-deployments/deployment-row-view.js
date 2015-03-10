/**
 * Module dependencies.
 */

var modal = require('modal');
var View = require('view');
var log = require('debug')('democracyos:settings-deployments');
var request = require('request');
var row = require('./deployment-row');
var t = require('t');
var template = require('./deployment-row');
var DeleteDeploymentModal = require('./delete-modal-view');

/**
 * Expose DeploymentRowView
 */

module.exports = DeploymentRowView;

/**
 * Creates a profile edit view
 */

function DeploymentRowView(deployment) {
  if (!(this instanceof DeploymentRowView)) {
    return new DeploymentRowView(deployment);
  };

  this.deployment = deployment;
  View.call(this, template, { deployment: deployment });
}

/**
 * Mixin with `Emitter`
 */

View(DeploymentRowView);

DeploymentRowView.prototype.switchOn = function() {
  this.bind('click', '.btn-remove', this.bound('remove'));
};

DeploymentRowView.prototype.switchOff = function() {
  this.unbind();
};

DeploymentRowView.prototype.remove = function remove() {
  var modal = new DeleteDeploymentModal(this.deployment);
}
