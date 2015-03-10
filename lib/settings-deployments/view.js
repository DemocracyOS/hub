/**
 * Module dependencies.
 */

var user = require('user');
var View = require('view');
var log = require('debug')('democracyos:settings-deployments');
var render = require('render');
var request = require('request');
var DeploymentRow = require('./deployment-row-view');
var t = require('t');
var template = require('./template');
var button = require('./new-deployment-button');

/**
 * Expose DeploymentsView
 */

module.exports = DeploymentsView;

/**
 * Creates a profile edit view
 */

function DeploymentsView() {
  if (!(this instanceof DeploymentsView)) {
    return new DeploymentsView();
  };

  View.call(this, template);

  this.load();
}

/**
 * Mixin with `Emitter`
 */

View(DeploymentsView);


DeploymentsView.prototype.load = function load() {
  log('request in process');
  var src = '/deployments/mine';
  var self = this;

  request
  .get(src)
  .end(onresponse.bind(this));

  function onresponse(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load deployments. Please try reloading the page. Thanks!';
      return this.error(message);
    };


    var deployments = res.body;
    if (deployments.length) {
      res.body.forEach(function (deployment) {
        var row = new DeploymentRow(deployment);
        self.find('.deployments').append(row.el);
      })
    } else {
      self.find('.deployments').append(render(button));
    }
  }
}
