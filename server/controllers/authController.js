const passport = require('passport');

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

exports.login = function(req, res, next) {
  passport.authenticate('local-signin', function (err, user, info) {
    res.json({
      success: !!user
    })
  })(req, res, next);
}