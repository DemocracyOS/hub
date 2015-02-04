/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var api = require('lib/db-api');
var restrict = require('lib/utils').restrict;

app.get("/users/me", restrict, function(req, res, next) {
  if (req.isAuthenticated()) return res.json(req.user);
  res.json({});
});

app.get('/user/exists', function(req, res, next) {
  api.user.exists(req.query.username, function(err, exists) {
    if (err) return next(err);
    return res.status(200).json({ exists: exists });
  });
});