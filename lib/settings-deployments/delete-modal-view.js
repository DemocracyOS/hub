/**
 * Module dependencies.
 */

var modal = require('modal');
var FormView = require('form-view');
var log = require('debug')('democracyos:settings-deployments');
var template = require('./delete-modal');
var page = require('page');
var deployment = require('deployment-model');

/**
 * Expose DeleteDeploymentModal
 */

module.exports = DeleteDeploymentModal;

/**
 * Creates a profile edit view
 */

function DeleteDeploymentModal(deployment) {
  if (!(this instanceof DeleteDeploymentModal)) {
    return new DeleteDeploymentModal(deployment);
  }

  this.deployment = deployment;
  FormView.call(this, template, { deployment: deployment });

  this.input = this.find('input.deployment-name');
  this.button = this.find('button.ok');
  this.fire();
}

/**
 * Mixin with `Emitter`
 */

FormView(DeleteDeploymentModal);

DeleteDeploymentModal.prototype.switchOn = function() {
  this.bind('input', '.deployment-name', this.bound('onchange'));
  this.bind('click', '.close', this.bound('hide'));
  this.on('success', this.bound('onsuccess'));
  this.on('error', this.bound('error'));
}

DeleteDeploymentModal.prototype.switchOff = function() {
  this.unbind();
  this.off('success');
  this.off('error');
}

DeleteDeploymentModal.prototype.fire = function fire() {
  this.modal = modal(this.el[0])
    .overlay()
    .closable()
    .show();
}

DeleteDeploymentModal.prototype.onchange = function(ev) {
  if (this.input.val() == this.deployment.attr('name')) {
    this.button.attr('disabled', null);
  } else {
    this.button.attr('disabled', true);
  }
}

DeleteDeploymentModal.prototype.error = function error() {
  this.find('.form-messages').removeClass('hide');
}

DeleteDeploymentModal.prototype.hide = function hide() {
  this.modal.hide();
}

/**
 * Show success message
 */

 DeleteDeploymentModal.prototype.onsuccess = function() {
  var self = this;
  deployment.fetchTil('non-existent');
  self.hide();
  page('/settings/deployments');
}
