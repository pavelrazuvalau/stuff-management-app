var users    = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.get('/user', users.status);

  app.post('/user/signup', users.signup);

  app.post('/user/signin', users.signin);

  app.get('/user/signout', users.signout);

  app.post('/user', users.edit);

  app.get('/user/all', users.hasAuthorization, users.getAll);

  app.post('/user/:userId', users.hasAuthorization, users.grantRole);

  app.delete('/user/:userId', users.hasAuthorization, users.delete);

  app.get('/user/check/:username', users.checkUsername);
};
