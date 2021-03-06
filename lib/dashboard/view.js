/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var DeploymentView = require('deployment-view');
var request = require('request');
var page = require('page');
var jwt = require('jwt');
var List = require('list.js');
var t = require('t');
var log = require('debug')('hub:dashboard');

module.exports = Dashboard;


function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template, { motto: t('dashboard.motto') });

  /**
   * DOM elements
   */

  this.elDeployments = this.el.find('.deployments')[0];

  /**
   * View model
   */

  this.deployments = [];

  /**
   * Startup
   */

  this.initialize();
}

View(Dashboard);

Dashboard.prototype.switchOn = function() {
  this.on('fetch', this.bound('load'));
};

Dashboard.prototype.initialize = function() {
  this.fetch();
};

Dashboard.prototype.fetch = function() {
  var view = this;
  request
  .get('/deployments')
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error %o', err || res.error);

    var response = JSON.parse(res.text);
    view.deployments =  response.deployments;
    view.userHasDeployment = response.userHasDeployment;
    view.emit('fetch');
  });
};

Dashboard.prototype.load = function() {
  // TODO: huge refactor here
  var visibilities = [1,2,3];
  var categories = ['featured', 'controversial', 'new', 'near you'];
  function randomElement(arr) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var i = getRandomInt(0, arr.length);
    return arr[i];
  }

  // Fill deployments list
  for (var i in this.deployments) {
    var v = this.deployments[i];
    var url = config['redirectUrl'] ? config['redirectUrl'] : v.url;
    url = jwt.getLoginUrl(url);
    var deployment = new DeploymentView({
      title: v.title,
      summary: v.summary,
      url: url,
      fancyUrl: v.url,
      visibility: 1, //randomElement(visibilities),
      participants: 42,
      category: randomElement(categories),
      image: v.imageUrl || 'https://daks2k3a4ib2z.cloudfront.net/54b5dacca1dc10190edce926/54c38ee62d5eaa62178ffc67_header-bg.jpg'
    });

    deployment.appendTo(this.elDeployments);
  }

  // Make list searchable
  this.list = new List('deployments', { valueNames: ['title', 'summary'] });
};
