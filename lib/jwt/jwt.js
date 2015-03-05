var cookie = require('cookie');

module.exports = {

  getToken: function() {
    return cookie('token');
  },

  setToken: function(token) {
    cookie('token', token);
  },

  clear: function() {
    cookie('token', null);
  },

  getLoginUrl: function(hostname) {
    // fixme: use buildUrl helper
    return hostname + '/signin/' + this.getToken();
  }

}
