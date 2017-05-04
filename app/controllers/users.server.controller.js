var User     = require('mongoose').model('User'),
    passport = require('passport');


var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].
      message;
    }
  }

  return message;
};

exports.status = function(req, res){
  res.status(200).send(req.user ? req.user : null);
}

exports.checkUsername = function(req, res){
  User.findOne({
    username: req.params.username
  }, function(err, user) {
    if (err) {
      res.status(500).send({message: "Internal server error"})
    } else {
      if (user){
        res.sendStatus(400);
      }
      else {
        res.sendStatus(200);
      }
    }
  });
}

exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function(err) {
  		if (err) {
  			return res.status(400).send({
  				message: getErrorMessage(err)
  			});
  		} else {
  			// Remove sensitive data before login
  			user.password = undefined;
  			user.salt = undefined;

  			req.login(user, function(err) {
  				if (err) {
  					res.send(400, err);
  				} else {
  					res.jsonp(user);
  				}
  			});
  		}
	  });
  } else {
    res.status(400).send({
      message: "You are already logged in"
    })
  }
};

exports.signin = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			//res.send(400, info);
      res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					//res.send(400, err);
          res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
}

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};
