var bCrypt = require('bcrypt-nodejs');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

module.exports = function (passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  // REGISTER
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function (req, username, password, done) {
      const generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

      User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (user) {
          return done(null, false, {
            message: 'That username is already taken'
          });
        } else {
          var userPassword = generateHash(password);
          var data = {
            username: username,
            password: userPassword,
            name: req.body.name,
          };

          User.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false);
            }

            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));

  // SIGN IN
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },

    function (req, username, password, done) {
      var User = user;
      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }

      User.findOne({
        where: {
          username: username
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false, {
            message: 'username does not exist'
          });
        }

        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }

        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function (err) {
        console.log("Error:", err);

        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  jwtOptions.secretOrKey = 'tasmanianDevil';

  passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    // var user = users[_.findIndex(users, { id: jwt_payload.id })];
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    }).then(function (user) {
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
    
  }));
}