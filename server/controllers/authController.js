const passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;

exports.register = function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (!user) {
      res.json({
        success: false,
        message: 'Username already exists',
      })
    } else {
      res.json({
        success: true,
      })
    }
  })(req, res, next);
}



var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

exports.login = function(req, res, next) {
  passport.authenticate('local-signin', function (err, user, info) {
    var payload, token;
    if (!!user) {
      payload = { id: user.id };
      token = jwt.sign(payload, jwtOptions.secretOrKey);
    }
    res.json({
      success: !!user,
      token: token,
    })
  })(req, res, next);
}