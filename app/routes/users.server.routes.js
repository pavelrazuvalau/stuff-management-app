var users    = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
  app.get('/', users.status);

  app.post('/signup', users.signup);

  app.post('/signin', users.signin);

  app.get('/signout', users.signout);
};
