/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var page = require('page');
var View = require('view');
var jwt = require('jwt');

module.exports = DeploymentView;

function DeploymentView(locals) {
  if (!(this instanceof DeploymentView)) {
    return new DeploymentView(name);
  };

  View.call(this, template, locals);

  this.url = locals.url;
}

View(DeploymentView);

DeploymentView.prototype.switchOn = function() {
  this.el.on('click', this.bound('onclick'));
};

DeploymentView.prototype.onclick = function() {
  this.url ? window.location = this.url : page('/signin');
};
