/**
 * Module dependencies.
 */

var View = require('view');
var log = require('debug')('democracyos:settings-deployments');
var template = require('./deployment-row');
var DeleteDeploymentModal = require('./delete-modal-view');
var classes = require('classes');

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
  }

  this.deployment = deployment;

  View.call(this, template, { deployment: deployment });

  this.classes = classes(this.el[0]);

  this.renderStatus();
}

/**
 * Mixin with `Emitter`
 */

View(DeploymentRowView);

DeploymentRowView.prototype.switchOn = function() {
  this.deployment.on('status:change', this.bound('renderStatus'));
  this.bind('click', '.btn-remove', this.bound('remove'));
}

DeploymentRowView.prototype.switchOff = function() {
  this.deployment.off('status:change', this.bound('renderStatus'));
  this.unbind();
}

DeploymentRowView.prototype.remove = function remove() {
  new DeleteDeploymentModal(this.deployment);
}

DeploymentRowView.prototype.renderStatus = function renderStatus() {
  this.classes
    .remove(/^status-/)
    .add('status-' + this.deployment.status());
}
