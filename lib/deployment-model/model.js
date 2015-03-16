var log = require('debug')('hub:deployment-model');
var request = require('request');
var Emitter = require('emitter');

module.exports = Deployment;

function Deployment (opts) {
  if (!(this instanceof Deployment)) return new Deployment(opts);

  this.$_url = opts.url;
  this.$_attrs = {};

  this.status('loading');
}

Emitter(Deployment.prototype);

Deployment.prototype.status = function status(_status) {
  if (!_status) return this.$_status;
  if ('string' !== typeof _status) throw new Error('Status must be a string.');
  var oldStatus = this.$_status;
  this.$_status = _status;
  if (this.$_status !== oldStatus) {
    if (this.$_status === 'creating') {
      this.fetchTil('ready');
    } else if (this.$_status === 'destroying') {
      this.fetchTil('non-existent');
    }
    this.emit('status:change', this.$_status);
  }
  return this;
}

Deployment.prototype.fetch = function fetch() {
  var self = this;

  if (this.$_req) return this;

  this.$_req = request
    .get(this.$_url)
    .set('Accept', 'application/json')
    .end(function(err, res){
      self.$_req = null;

      setTimeout(function(){
        self.emit('fetch:end');
      }, 0);

      if (err) return self.status('error');

      var deployment = res.body;

      if (!deployment) return self.status('non-existent');

      if ('object' !== typeof deployment) throw new Error('Bad response from server.');

      self.attrs(deployment);
    });

  return this;
}

Deployment.prototype.fetchTil = function fetchTil(til, fn) {
  var self = this;
  var current = this.status();
  if (current === til) return fn && fn(null, current), this;

  this.once('fetch:end', function(){
    var status = self.status();
    if (status === 'error') return fn && fn(status, status);
    if (status === til) return fn && fn(null, status);

    if (til === 'ready' && status === 'non-existent') {
      return fn && fn(null, status);
    }

    setTimeout(function(){
      self.fetchTil(til, fn);
    }, 3000);
  });

  this.fetch();
}

Deployment.prototype.onLoaded = function onLoaded(fn) {
  if (this.status() !== 'loading') return fn(), this;
  this.once('status:change', fn);
}

Deployment.prototype.attrs = function attrs(values) {
  if (!values) return this.$_attrs;
  if ('object' !== typeof values) throw new Error('Attributes must be an object.');
  this.$_attrs = values || {};
  this.status(values.status || 'error');
}

Deployment.prototype.attr = function attr(key) {
  if (!this.$_attrs) return;
  return this.$_attrs[key];
}

Deployment.prototype.url = function url() {
  var uri = this.attr('url');
  if (!uri) return '';
  return location.protocol + '//' + uri;
}