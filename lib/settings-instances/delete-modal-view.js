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
var page = require('page');

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
  this.bind('click', '.ok', this.bound('confirm'));
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

DeleteInstanceModal.prototype.confirm = function confirm() {
  var input = this.find('input.instance-name').val();
  this.find('.error').addClass('hide');
  if (input == this.instance.name) {
    this.deleteInstance();
  } else {
    this.find('.error').removeClass('hide');
  }
}

DeleteInstanceModal.prototype.hide = function hide() {
  this.modal.hide();
}

DeleteInstanceModal.prototype.deleteInstance = function deleteInstance() {
  var self = this;

  request
    .del('/instances/:id'.replace(':id', this.instance.id))
    .end(function(err, res) {
      if (!res.ok) {
         return self.errors(res.error);
      };
      if (err || (res.body && res.body.error)) {
        return self.errors(err || res.body.error);
      };

      page('/settings/instances');
    });
}

DeleteInstanceModal.prototype.errors = function errors(error) {
  this.find('.error')
    .removeClass('hide')
    .html(error);
}
