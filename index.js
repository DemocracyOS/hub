/**
 * Module dependencies.
 */

var config = require('lib/config');
var http = require('http');
// var https = require('https');
var express = require('express');
var app = module.exports = require('lib/boot');
var fs = require('fs');
var debug = require('debug')('hub');

// var secure = 'https' == config('protocol');

/**
 * Configure standard server
 */

var server = http.createServer(app);
var port = config('privatePort');

/**
 * Configure secure server (SSL) if necessary
 */

// var secureServer;
// var securePort;
// if (secure) {
//   var ssl = config('ssl');

//   var privateKey = fs.readFileSync(ssl.serverKey, 'utf-8');
//   var certificate = fs.readFileSync(ssl.serverCert, 'utf-8');

//   secureServer = https.createServer({ key: privateKey, cert: certificate }, app);
//   securePort = ssl.port;
// }

/**
 * Launch servers
 */

server.listen(app.get('privatePort'), function() {
  debug('Application started on port %d', app.get('privatePort'));
});

// if (secureServer && securePort) {
//   secureServer.listen(securePort, function() {
//     debug('Secure application started on port %d', securePort);
//   });
// }
