/**
 * Module dependencies.
 */

var template = require('./start-democracy-template.jade');
var View = require('view');

function StartDemocracy() {
  if (!(this instanceof StartDemocracy)) {
    return new StartDemocracy();
  }

  View.call(this, template);
}

/**
 * Inherit from View
 */

View(StartDemocracy);

/**
 * Expose View
 */

module.exports = StartDemocracy;
