/*
 * Module dependencies.
 */

var config = require('config');
var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var deploymentUnique = require('deployment-unique');
var lock = require('loading-lock');
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
  this.form = this.find('form');
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

DeploymentForm.prototype.loading = function() {
  var self = this;
  this.disable();
  this.messageTimer = setTimeout(function() {
    self.messages(t('deployment.form.create.wait'), 'sending');
    self.spin();
    self.find('a.cancel').addClass('enabled')
  }, 1000);
};

DeploymentForm.prototype.spin = function() {
  var div = this.find('.fieldsets');
  if (!div.length)
    return;
  var self = this;
  this.spinTimer = setTimeout(function() {
    self.spinner = lock(div[0], { size: 100 });
    self.spinner.lock();
  }, 500);
};

DeploymentForm.prototype.unspin = function() {
  clearTimeout(this.spinTimer);
  if (!this.spinner)
    return;
  this.spinner.unlock();
};

DeploymentForm.prototype.disable = function() {
  this.disabled = true;
  this.form.attr('disabled', true);
  this.find('button').attr('disabled', true);
};

DeploymentForm.prototype.enable = function() {
  this.disabled = false;
  this.form.attr('disabled', null);
  this.find('button').attr('disabled', null);
};
