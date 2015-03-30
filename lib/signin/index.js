/**
 * Module dependencies.
 */

var express = require('express');
var t = require('t-component');
var User = require('lib/models').User;
var auth = User.authenticate();
var expose = require('lib/db-api').user.expose;
var jwt = require('lib/jwt');
var log = require('debug')('hub:signin-api');

/**
 * Exports Application
 */

var app = module.exports = express();

/**
 * Add GET route
 */

app.get('/', require('lib/layout'));

/**
 * Define routes for SignUp module
 */

app.post('/', function(req, res, next) {
  auth(req.body.email, req.body.password, function (err, user, info) {
    if (err) {
      return res.status(200).json({ error: t(err.message) });
    }
    if (!user) {
      return res.status(200).json({ error: t(info.message) });
    }
    if (!user.emailValidated) {
      return res.status(200).json({ error: t('signin.error.email-not-valid') });
    }
    if (user.disabledAt) {
      return res.status(200).json({ error: t('signin.error.user-disabled') });
    }
 
    req.login(user, function(err) {
      if (err) return res.status(200).json({ error: t(err.message) });
      log('Encoding user: %j', expose.confidential(user));
      var token = jwt.encodeToken(expose.confidential(user), app.get('jwtTokenSecret'));
      log('Token: %s', token);
      return res.status(200).json(token);
    });
})
});