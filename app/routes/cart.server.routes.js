var users    = require('../../app/controllers/users.server.controller'),
    cart     = require('../../app/controllers/cart.server.controller');

module.exports = function(app) {
  app.route('/cart')
    .get(users.requiresLogin, cart.get)
    .post(users.requiresLogin, cart.add)
    .delete(users.requiresLogin, cart.clear)
  app.route('/cart/:stuffId')
    .delete(users.requiresLogin, cart.delete);
};
