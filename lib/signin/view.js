/*
 * Module dependencies.
 */

var user = require('user');
var dom = require('dom');
var FormView = require('form-view');
var template = require('./template');
var page = require('page');
var t = require('t');
var jwt = require('jwt');
var query = require('querystring');

/**
 * Expose SigninForm.
 */
module.exports = SigninForm;

/**
 * SigninForm
 *
 * @return {SigninForm} `SigninForm` instance.
 * @api public
 */

function SigninForm (emailValidated) {
  if (!(this instanceof SigninForm)) {
    return new SigninForm(emailValidated);
  }

  var locals = { emailValidated: !!emailValidated }

  FormView.call(this, template, locals);
}

/**
 * Inherit from `FormView`
 */

FormView(SigninForm);

SigninForm.prototype.switchOn = function () {
  this.on('success', this.bound('onSuccess'));
};

/**
 * Show success message
 */
SigninForm.prototype.onSuccess = function (res) {
  var payload = JSON.parse(res.text);
  if (payload.token) {
    jwt.setToken(payload.token);
  }

  var search = query.parse(location.search);
  if (search.returnUrl) {
    window.location = search.returnUrl;
  }

  user.load('me');
  page('/');
};

/**
 * Handle http response to show message to the user.
 *
 * @returns {Mixed}
 * @override from {FormView}
 */
SigninForm.prototype.response = function (err, res) {
  if (err) {
    return this.errors([err]);
  }

  if (!res.ok) {
    return this.errors([res.text]);
  }

  //Redirect if come from unverified email
  //FIXME: this error detection mechanism is a little weird, we should avoid compare keys.
  if (res.ok && JSON.parse(res.text).error === t('signin.error.email-not-valid')) {
    page('/signup/resend-validation-email');
  }

  if (res.body && res.body.error) {
    return this.errors([res.body.error]);
  }

  this.emit('success', res);
};
