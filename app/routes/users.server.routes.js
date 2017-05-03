var users    = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.get('/user', users.status);

  app.post('/user/signup', users.signup);

  app.post('/user/signin', users.signin);

  app.get('/user/signout', users.signout);
};
