/**
 * Module dependencies.
 */

var request = require('request');
var Emitter = require('emitter');
var inherit = require('inherit');

/**
 * Expose view
 */

 module.exports = InstanceUnique;

 /**
 * Create `InstanceUnique` container
 */

function InstanceUnique(options) {
  if (!(this instanceof InstanceUnique)) {
    return new InstanceUnique();
  }

  this.input = options.el;
  this.input.on('blur', this.onblur.bind(this));
  this.input.on('keyup', this.onchange.bind(this));

  this.interval = options.interval || 1000;
  this.min = options.min || 2;
}

inherit(InstanceUnique, Emitter);

InstanceUnique.prototype.onblur = function() {
  check.call(this);
};

InstanceUnique.prototype.onchange = function() {
  if (this.intervalID) clearInterval(this.intervalID)
  this.intervalID = setInterval(check.bind(this), this.interval);
};

function check() {
  this.emit('checking');

  // If there is other checking pending, remove it
  if (this.intervalID) clearInterval(this.intervalID);

  // Save previous value and fetch the current
  this.previousValue = this.value;
  this.value = this.input.val();

  // Avoid same values be checked more than once
  if (this.value && this.previousValue && this.value === this.previousValue) return;

  // Validate minimum length
  if (this.value.length < this.min) return;

  // Do the request to the backend
  var self = this;
  request
  .get('/instances/exists')
  .query({ name: this.value })
  .end(function(err, res) {
    if (err) self.emit('error', err);
    self.emit('success', { exists: res.body.exists });
  });
}