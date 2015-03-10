/*
 *  Module dependencies
 */

var config = require('lib/config');
var db = require('democracyos-db');

/**
 * Expose models linker helper
 *
 * @param {Express} app `Express` instance
 */

var exports = module.exports = function models (app) {

  // Initialize data models
  var dataDb = db.getDefaultConnection();

  /**
   * Register `User` model
   */

  exports.User = require('./user')(dataDb);

  /**
   *  Register `Token` model
   */

  require('./token')(dataDb);

  /**
   * Register `Instance` model
   */

  require('./instance')(dataDb);

  /**
   * Register `Feed` model
   */

  require('./feed')(dataDb);

  // Perform primary connection
   db.connect(config('mongoUrl'));
}
