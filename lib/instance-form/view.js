/*
 * Module dependencies.
 */

var config = require('config');
var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var UserUnique = require('user-unique');
var t = require('t');

/**
 * Expose InstanceForm.
 */
module.exports = InstanceForm;

/**
 * InstanceForm
 *
 * @return {InstanceForm} `InstanceForm` instance.
 * @api public
 */

function InstanceForm () {
  if (!(this instanceof InstanceForm)) {
    return new InstanceForm();
  }

  FormView.call(this, template, { instanceDomain: '.' + config['instanceDomain']});

  this.elUrl = this.find('input[name=username]');
  this.userUnique = new UserUnique({ el: this.elUrl });
}

/**
 * Inherit from `FormView`
 */

FormView(InstanceForm);

InstanceForm.prototype.switchOn = function() {
  this.on('success', this.bound('onsuccess'));

  this.userUnique.on('checking', this.bound('onuserchecking'));
  this.userUnique.on('success', this.bound('onuserchecked'));
  this.userUnique.on('error', this.bound('onusercheckfailure'));
};

InstanceForm.prototype.onuserchecking = function() {
  console.log('checking...');
};

InstanceForm.prototype.onuserchecked = function(res) {
  console.log('checked: ' + res.exists);
};

InstanceForm.prototype.onusercheckfailure = function(err) {
  console.log('error: ' + err);
};

InstanceForm.prototype.onsuccess = function(res) {
  var instance = JSON.parse(res.text);
  page('/instance/new/success/'  + instance._id);
};