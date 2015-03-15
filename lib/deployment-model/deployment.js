var Deployment = require('./model');

module.exports = new Deployment({
  url: '/deployments/mine'
}).fetch();
