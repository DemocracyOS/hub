/**
 * Module dependencies.
 */

var config = require('lib/config');
var express = require('express');
var app = module.exports = express();

/**
 * GET Add/edit deployment form.
 */

app.use('/', require('lib/layout'));
