var users    = require('../../app/controllers/users.server.controller'),
    stuff = require('../../app/controllers/stuff.server.controller');

module.exports = function(app) {
  app.route('/stuff')
    .get(stuff.get)
    .post(users.requiresLogin, stuff.hasAuthorization, stuff.add);
  app.route('/stuff:stuffId')
    .get(stuff.getByID)
    .put(users.requiresLogin, stuff.hasAuthorization, stuff.update)
    .delete(users.requiresLogin, stuff.hasAuthorization, stuff.delete);
  app.param('stuffId', stuff.findByID);
};
