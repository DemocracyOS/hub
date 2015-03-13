/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var t = require('t-component');
var app = module.exports = express();

/**
 * Set `views` directory for module
 */

app.set('views', __dirname);

/**
 * Set `view engine` to `jade`.
 */

app.set('view engine', 'jade');

/**
 * GET index page.
 */

app.use(function (req, res) {
  res.status(404).render('template', { config: config, t: t });
});
