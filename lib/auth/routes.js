/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var log = require('debug')('hub:auth:routes');

/**
 * Expose auth app
 */

var app = module.exports = express();

/**
 * Local Auth routes
 */

app.post('/login'
  , passport.authenticate('local', { failureRedirect: '/' })
  , function(req, res) {
    res.redirect('/');
  }
);

app.post('/logout'
  , function(req, res, next) {
    try {
      req.logout();
      log('Logging out user %s', req.user);
      res.sendStatus(200);
    } catch (err) {
      log('Failed to logout user: %s', err);
      res.sendStatus(500);
    }
  }
);
