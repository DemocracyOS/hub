/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var t = require('t-component');
var User = require('lib/models').User;
var auth = User.authenticate();
var jwt = require('lib/jwt');

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
 
    return jwt.signin(user, req, res);
  });
});
