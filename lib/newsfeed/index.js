/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var app = module.exports = express();

/**
 * GET index page.
 */

app.get('/', require('lib/layout'));
