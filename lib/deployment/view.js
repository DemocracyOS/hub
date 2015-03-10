/*
 * Module dependencies.
 */

var config = require('config');
var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var deploymentUnique = require('deployment-unique');
var t = require('t');

/**
 * Expose DeploymentForm.
 */
module.exports = DeploymentForm;

/**
 * DeploymentForm
 *
 * @return {DeploymentForm} `DeploymentForm` deployment.
 * @api public
 */

function DeploymentForm () {
  if (!(this instanceof DeploymentForm)) {
    return new DeploymentForm();
  }

  FormView.call(this, template, { deploymentDomain: '.' + config.deploymentDomain});

  this.elUrl = this.find('input[name=name]');
  this.deploymentUnique = new deploymentUnique({ el: this.elUrl });
}

/**
 * Inherit from `FormView`
 */

FormView(DeploymentForm);

DeploymentForm.prototype.switchOn = function() {
  this.on('success', this.bound('onsuccess'));

  //this.deploymentUnique.on('checking', this.bound('onuserchecking'));
  this.deploymentUnique.on('success', this.bound('onuserchecked'));
  //this.deploymentUnique.on('error', this.bound('onusercheckfailure'));
};

DeploymentForm.prototype.onuserchecked = function(res) {
  var container = this.find('.input-group', this.elUrl);
  var message = this.find('.name-unavailable', this.elUrl);

  if (res.exists) {
    container.addClass('has-error');
    container.removeClass('has-success');
    message.removeClass('hide');
  } else {
    container.removeClass('has-error');
    container.addClass('has-success');
    message.addClass('hide');
  }
};

DeploymentForm.prototype.onsuccess = function(res) {
  var deployment = JSON.parse(res.text);
  page('/');
};
