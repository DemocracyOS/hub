/**
 * Module dependencies.
 */

var modal = require('modal');
var View = require('view');
var log = require('debug')('democracyos:settings-instances');
var request = require('request');
var row = require('./instance-row');
var t = require('t');
var template = require('./instance-row');
var DeleteInstanceModal = require('./delete-modal-view');

/**
 * Expose InstanceRowView
 */

module.exports = InstanceRowView;

/**
 * Creates a profile edit view
 */

function InstanceRowView(instance) {
  if (!(this instanceof InstanceRowView)) {
    return new InstanceRowView(instance);
  };

  this.instance = instance;
  View.call(this, template, { instance: instance });
}

/**
 * Mixin with `Emitter`
 */

View(InstanceRowView);

InstanceRowView.prototype.switchOn = function() {
  this.bind('click', '.btn-remove', this.bound('remove'));
};

InstanceRowView.prototype.switchOff = function() {
  this.unbind();
};

InstanceRowView.prototype.remove = function remove() {
  var modal = new DeleteInstanceModal(this.instance);
}
