/**
 * Module dependencies.
 */

var modal = require('modal');
var View = require('view');
var log = require('debug')('democracyos:settings-instances');
var request = require('request');
var row = require('./instance-row');
var t = require('t');
var template = require('./delete-modal');

/**
 * Expose DeleteInstanceModal
 */

module.exports = DeleteInstanceModal;

/**
 * Creates a profile edit view
 */

function DeleteInstanceModal(instance) {
  if (!(this instanceof DeleteInstanceModal)) {
    return new DeleteInstanceModal(instance);
  };

  this.instance = instance;
  View.call(this, template, { instance: instance });

  this.fire();
}

/**
 * Mixin with `Emitter`
 */

View(DeleteInstanceModal);

DeleteInstanceModal.prototype.switchOn = function() {
  this.bind('click', '.cancel', this.bound('cancel'));
};

DeleteInstanceModal.prototype.switchOff = function() {
  this.unbind();
};

DeleteInstanceModal.prototype.fire = function fire() {
  this.modal = modal(this.el[0])
    .overlay()
    .closable()
    .show();
}

DeleteInstanceModal.prototype.cancel = function cancel() {
  this.hide();
}

DeleteInstanceModal.prototype.ok = function ok() {
  this.hide();
}

DeleteInstanceModal.prototype.hide = function hide() {
  if (this.modal) this.modal.hide();
}
