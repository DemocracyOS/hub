var cookie = require('cookie');
var domain = require('./domain')

module.exports = {

  getToken: function getToken() {
    return cookie('token');
  },

  setToken: function setToken(token) {
    cookie('token', token, { domain: domain });
  },

  clear: function clear() {
    cookie('token', null, { domain: domain });
  },

  getLoginUrl: function(hostname) {
    // fixme: use buildUrl helper
    return hostname + '/signin/' + this.getToken();
  }

}
