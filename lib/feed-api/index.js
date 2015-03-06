/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var express = require('express');
var utils = require('lib/utils');
var expose = utils.expose;
var pluck = utils.pluck;
var log = require('debug')('hub:feed-api');

var app = module.exports = express();

app.get('/feeds/all', function (req, res) {
  log('Request /feeds/all');

  api.feed.all(function(err, feeds) {
    if (err) return _handleError(err, req, res);

    // filter only public documents
    log('Serving feeds %j', pluck(feeds, "id"));

    var keys = [
      'id type url data'
    ].join(' ');

    res.json(feeds.map(expose(keys)));
  });
});
