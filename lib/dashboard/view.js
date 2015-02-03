/**
 * Module dependencies.
 */

var config = require('config');
var template = require('./template');
var View = require('view');
var InstanceView = require('instance-view');
var request = require('request');
var page = require('page');
var jwt = require('jwt');
var List = require('list.js');
var log = require('debug')('hub:dashboard');

module.exports = Dashboard;


function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  };

  View.call(this, template);

  /**
   * DOM elements
   */

  this.elInstances = this.el.find('.instances')[0];
  this.elNew = this.el.find('.btn.new');

  /**
   * View model
   */

  this.instances = [];

  /**
   * Startup
   */

  this.initialize();
}

View(Dashboard);

Dashboard.prototype.switchOn = function() {
  this.on('fetch', this.bound('load'));
  this.elNew.on('click', this.bound('onnew'));
};

Dashboard.prototype.initialize = function() {
  this.fetch();
};

Dashboard.prototype.fetch = function() {
  var view = this;
  request
  .get('/instances')
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error %o', err || res.error);

    var response = JSON.parse(res.text);
    view.instances =  response.instances;
    view.userHasInstance = response.userHasInstance;
    view.emit('fetch');
  });
};

Dashboard.prototype.load = function() {
  var visibilities = [1,2,3];
  var categories = ['featured', 'controversial', 'new'];
  function randomElement(arr) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var i = getRandomInt(0, arr.length - 1);
    return arr[i];
  }

  // Fill instances list
  for (var i in this.instances) {
    var v = this.instances[i];
    var url = config['redirectUrl'] ? config['redirectUrl'] : v.url;
    url = jwt.getLoginUrl(url);
    var instance = new InstanceView({
      title: v.title,
      summary: v.summary,
      url: url,
      visibility: randomElement(visibilities),
      participants: 42,
      category: randomElement(categories),
      url: 'darwin.democracyos.com',
      image: 'https://daks2k3a4ib2z.cloudfront.net/54b5dacca1dc10190edce926/54c38ee62d5eaa62178ffc67_header-bg.jpg' 
    });

    this.elInstances.appendChild(instance.render()[0]);
  }

  // Make list searchable
  this.list = new List('instances', { valueNames: ['title', 'summary'] });
};

Dashboard.prototype.onnew = function() {
  page('/instance/new');
};