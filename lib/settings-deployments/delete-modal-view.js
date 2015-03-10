/**
 * Module dependencies.
 */

var modal = require('modal');
var View = require('view');
var log = require('debug')('democracyos:settings-deployments');
var request = require('request');
var row = require('./deployment-row');
var t = require('t');
var template = require('./delete-modal');
var page = require('page');

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
  };

  this.deployment = deployment;
  View.call(this, template, { deployment: deployment });

  this.fire();
}

/**
 * Mixin with `Emitter`
 */

View(DeleteDeploymentModal);

DeleteDeploymentModal.prototype.switchOn = function() {
  this.bind('click', '.cancel', this.bound('cancel'));
  this.bind('click', '.ok', this.bound('confirm'));
};

DeleteDeploymentModal.prototype.switchOff = function() {
  this.unbind();
};

DeleteDeploymentModal.prototype.fire = function fire() {
  this.modal = modal(this.el[0])
    .overlay()
    .closable()
    .show();
}

DeleteDeploymentModal.prototype.cancel = function cancel() {
  this.hide();
}

DeleteDeploymentModal.prototype.ok = function ok() {
  this.hide();
}

DeleteDeploymentModal.prototype.confirm = function confirm() {
  var input = this.find('input.deployment-name').val();
  this.find('.error').addClass('hide');
  if (input == this.deployment.name) {
    this.deleteDeployment();
  } else {
    this.find('.error').removeClass('hide');
  }
}

DeleteDeploymentModal.prototype.hide = function hide() {
  this.modal.hide();
}

DeleteDeploymentModal.prototype.deleteDeployment = function deleteDeployment() {
  var self = this;

  request
    .del('/deployments/:id'.replace(':id', this.deployment.id))
    .end(function(err, res) {
      if (!res.ok) {
         return self.errors(res.error);
      };
      if (err || (res.body && res.body.error)) {
        return self.errors(err || res.body.error);
      };

      self.hide();
      page('/settings/deployments');
    });
}

DeleteDeploymentModal.prototype.errors = function errors(error) {
  this.find('.error')
    .removeClass('hide')
    .html(error);
}
