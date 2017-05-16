var User     = require('mongoose').model('User'),
    Wish     = require('mongoose').model('Wish'),
    Cart     = require('mongoose').model('Cart'),
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
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      if (user){
        res.status(200).send({isAvailable: false});
      }
      else {
        res.status(200).send({isAvailable: true});
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
        var wish = new Wish();
        wish.user = user;
        wish.save(function (err) {
          if (err) {
      			return res.status(400).send({
      				message: getErrorMessage(err)
      			});
      		}
        });
        var cart = new Cart();
        cart.user = user;
        cart.save(function (err) {
          if (err) {
      			return res.status(400).send({
      				message: getErrorMessage(err)
      			});
      		}
        });
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
  res.sendStatus(200);
};

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  next();
};

exports.edit = function (req, res) {
  if (req.user){
    var user = req.user;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.phone = req.body.phone;

    user.save(function(err){
      if (err){
        res.status(400).send({
          message: getErrorMessage(err)
        })
      }
      else {
        res.sendStatus(200);
      }
    })
  }
  else res.sendStatus(403);
}

exports.hasAuthorization = function(req, res, next) {
  if (req.user.role != 'Admin') {
    return res.status(403).send({
      message: 'Access denied'
    });
  }
  next();
};

exports.getAll = function(req, res){
  User.find().lean() .exec(function (err, users) {
    if (err){
      res.status(400).send({
        message: getErrorMessage
      })
    }
    else {
      users.splice(0, 1);
      res.jsonp(users);
    }
  })
}

exports.grantRole = function (req, res) {
  User.update({
    _id: req.params.userId
  }, {
    $set: {
      role: req.body.role
    }
  }, function (err) {
    if (err){
      res.status(400).send({
        message: getErrorMessage
      })
    }
    else {
      res.sendStatus(200);
    }
  })
}

exports.delete = function (req, res) {
  User.remove({
    _id: req.params.userId
  }, function (err) {
    if (err){
      res.status(400).send({
        message: getErrorMessage
      })
    }
    else {
      res.sendStatus(200);
    }
  })
}
