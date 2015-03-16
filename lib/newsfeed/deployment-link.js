var o = require('dom');
var render = require('render');

var View = require('view');
var template = require('./deployment-link.jade');
var statusTemplate = require('./deployment-link-status.jade');

module.exports = DeploymentLink;

function DeploymentLink(deployment) {
  if (!(this instanceof DeploymentLink)) return new DeploymentLink(deployment);

  this.deployment = deployment;

  View.call(this, template);

  this.renderStatus();

  deployment.on('status:change', this.bound('renderStatus'));
}

View(DeploymentLink);

DeploymentLink.prototype.renderStatus = function renderStatus() {
  var status = this.deployment.status();
  var el = o(render.dom(statusTemplate, { deployment: this.deployment }));
  this.el.empty().append(el);
}
