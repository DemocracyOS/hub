/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var page = require('page');
var View = require('view');
var jwt = require('jwt');

module.exports = InstanceView;

function InstanceView(locals) {
  if (!(this instanceof InstanceView)) {
    return new InstanceView(name);
  };

  View.call(this, template, locals);

  this.url = locals.url;
}

View(InstanceView);

InstanceView.prototype.switchOn = function() {
  this.el.on('click', this.bound('onclick'));
};

InstanceView.prototype.onclick = function() {
  this.url ? window.location = this.url : page('/signin');
};
