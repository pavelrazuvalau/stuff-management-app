var users    = require('../../app/controllers/users.server.controller'),
    wish     = require('../../app/controllers/wish.server.controller');

module.exports = function(app) {
  app.route('/wish')
    .get(users.requiresLogin, wish.get)
    .post(users.requiresLogin, wish.add)
    .delete(users.requiresLogin, wish.clear)
  app.route('/wish/:wishId')
    .delete(users.requiresLogin, wish.delete);
};
