var log = require('debug')('hub:jwt');
var config = require('lib/config');
var jwt = require('jwt-simple');
var utils = require('lib/utils');
var expose = utils.expose;
var moment = require('moment');

exports.encodeToken = function encodeToken(user, secret) {
  var expires = moment().add(7, 'days').valueOf();
  var token = jwt.encode({
    iss: user.email,
    exp: expires,
    user: user
  }, secret);

  return {
    token : token,
    expires: expires,
    user: user
  };
};

exports.decodeToken = function decodeToken(token, secret, cb) {
  try {
    log('Attempting to decode token...');
    var decoded = jwt.decode(token, secret);
    if (decoded.exp <= Date.now()) {
      log('Access token has expired');
      return cb(new Error('Access token has expired'));
    }

    var Deployment = require('lib/db-api').deployment;
    var user = decoded.user;
    log('Token decoded successfully');
    Deployment.count({ owner: user._id }, function(err, count) {
      if (err) return log('Token decoded, but cannot get deployments of user: %s', err), cb(err);
      log('Deployment count for user: %d', count);
      user.deployments = count;
      log('Token decoded successfully. Delivering user %j', user);

      return cb(null, user);
    });
  } catch (err) {
    log('Cannot decode token: %s', err);
    return cb(err);
  }
};

exports.signin = function signin(user, req, res) {
  req.user = user;
  var token = exports.encodeToken(confidential(user), config('secret'));
  res.cookie('token', token.token, { domain: resolveDomain(), expires: new Date(token.expires) });
  return res.sendStatus(200);

  function resolveDomain() {
    return !config('deploymentDomain') || 'localhost' === config('deploymentDomain').substring(0, 9)
      ? null
      : '.' + config('deploymentDomain');
  }
};

exports.middlewares = {
  user: function user(secret) {
    return function(req, res, next) {
      var qs = req.query ? req.query.access_token : '';
      var token = req.cookies.token;

      if (token) {
        exports.decodeToken(token, secret, function(err, user) {
          if (err) return log('Error decoding token: %s', err), next();
          if (!user) return log('No user found for token %s', token), next();

          log('Logging in user %s', user.id);
          req.user = user;
          next();
        });
      } else {
        return log('No cookie with JWT token received.'), next();
      }
    }
  }
};

function confidential(user) {
  return expose('id firstName lastName email gravatar() staff profilePictureUrl notifications')(user);
}