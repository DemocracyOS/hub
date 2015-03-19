/**
* Force load with https on parameter environments (defaults to production)
* https://devcenter.heroku.com/articles/http-routing#heroku-headers
*
* Orignal function from https://github.com/paulomcnally/node-heroku-ssl-redirect
*
* WARNING: only use in a heroku (or other reverse-proxy) environments
*/
var _ = require('underscore');
var log = require('debug')('ssl');

//TODO: replace this with `ssl` module from `DemocracyOS/app`

module.exports = function herokuSslRedirect (environments) {
  environments = environments || ['production'];

  return function(req, res, next) {
    if (_.contains(environments, process.env.NODE_ENV)) {
      if (req.headers['x-forwarded-proto'] != 'https') {

        var redirectionUrl = 'https://' + req.host + req.originalUrl;
        log('Forcing redirection to [%s]', redirectionUrl);
        res.redirect(redirectionUrl);
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  };
};