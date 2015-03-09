/**
 * Module dependencies.
 */

var user = require('user');
var View = require('view');
var log = require('debug')('democracyos:settings-instances');
var render = require('render');
var request = require('request');
var row = require('./instance-row');
var t = require('t');
var template = require('./template');

/**
 * Expose InstancesView
 */

module.exports = InstancesView;

/**
 * Creates a profile edit view
 */

function InstancesView() {
  if (!(this instanceof InstancesView)) {
    return new InstancesView();
  };

  View.call(this, template);

  this.load();
}

/**
 * Mixin with `Emitter`
 */

View(InstancesView);


InstancesView.prototype.load = function load() {
  log('request in process');
  var src = '/instances/mine';
  var self = this;

  request
  .get(src)
  .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load instances. Please try reloading the page. Thanks!';
      return this.error(message);
    };

    res.body.forEach(function (instance) {
      self.find('.instances').append(render(row, { instance: instance }));
    })
  }
}
