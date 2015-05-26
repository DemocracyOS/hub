var log = require('debug')('hub:jwt');
var jwt = require('jwt-simple');
var moment = require('moment');
var User = require('lib/models').User;
var api = require('lib/db-api');

exports.encodeToken = function encodeToken(user, secret) {
  var expires = moment().add(7, 'days').valueOf();
  var token = jwt.encode({
    iss: user.email,
    exp: expires
  }, secret);

  return {
    token : token,
    expires: expires,
    user: user.toJSON()
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

    User.findByEmail(decoded.iss, function(err, user) {
      if (err) return log('Token has been decoded, but user fetching failed with the following error: %s', err), cb(err);
      if (!user) return log('Token has been decoded, but user was not found'), cb(new Error('No user for token %s', token));

      log('Token decoded successfully');
      api.deployment.count({ owner: user.id }, function(err, count) {
        if (err) return log('Token decoded, but cannot get deployments of user: %s', err), cb(err);
        log('Deployment count for user: %d', count);
        user.deployments = count;
        log('Token decoded successfully. Delivering user %j', user);

        return cb(null, user);
      });
    });
  } catch (err) {
    log('Cannot decode token: %s', err);
    return cb(err);
  }
};

exports.middlewares = {
  user: function user(secret) {
    return function(req, res, next) {
      var qs = req.query ? req.query.access_token : '';
      var token = req.cookies.token || qs || req.headers['x-access-token'];

      if (token) {
        exports.decodeToken(token, secret, function(err, user) {
          if (err) return log('Error decoding token: %s', err), next();
          if (!user) return log('No user found for jwt %s', token), next();

          log('Logging in user %s', user.id);
          req.login(user, function(err) {
            if (err) return res.json(500, { error: err.message });

            next();
          });
        });
      } else {
        log('HTTP header x-access-token has no token. Moving on...');
        return next();
      }
    }
  }
};
