/**
 * Module dependencies.
 */

var bus = require('bus');
var page = require('page');
var request = require('request');
var log = require('debug')('hub:logout');
var user = require('user');

page('/logout', function(ctx, next) {
  bus.emit('logout');

  setTimeout(redirect, 0);

  function redirect () {
    page('/signin');
  }
});
