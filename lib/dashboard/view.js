/**
 * Module dependencies.
 */

var template = require('./template');
var View = require('view');

module.exports = Dashboard;

function Dashboard() {
  if (!(this instanceof Dashboard)) {
    return new Dashboard();
  }

  View.call(this, template);
}

Dashboard.prototype.switchOn = function () {
  
};

Dashboard.prototype.onCreate = function () {
  console.log("redirect to user creation form");
};

View(Dashboard);
