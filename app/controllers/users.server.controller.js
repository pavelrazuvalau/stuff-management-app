var User = require('mongoose').model('User');

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

exports.renderSignin = function(req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign in',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

exports.renderSignup = function(req, res, next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign up',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.singleUser = function(req, res, next, usr) {
  User.findOne({
    username: usr
  }, function(err, user) {
    if (!user) {
      if (err) {
        var message = getErrorMessage(err);
        req.flash('error', message);
      }
      else {
        req.flash('error', 'User not found');
      }
      return res.redirect('/');
    } else{
      req.userInfo = user;
      next();
    }
  });
};

exports.profile = function(req, res) {
  res.render('profile', {
    title: req.userInfo.fullName+' - Profile',

    fullName: req.user ? req.user.fullName : '',
    username: req.user ? req.user.username : '',

    fullNameInfo: req.userInfo.fullName,
    firstNameInfo: req.userInfo.firstName,
    lastNameInfo: req.userInfo.lastName,
    emailInfo: req.userInfo.email,
    usernameInfo: req.userInfo.username,
    roleInfo: req.userInfo.role,
    messages: req.flash('error')
  });
}
