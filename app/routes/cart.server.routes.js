var users    = require('../../app/controllers/users.server.controller'),
    cart     = require('../../app/controllers/cart.server.controller'),
    stuff    = require('../../app/controllers/stuff.server.controller')

module.exports = function(app) {
  app.route('/cart')
    .get(users.requiresLogin, cart.get)
    .post(users.requiresLogin, cart.add)
    .delete(users.requiresLogin, cart.clear)
  app.route('/cart/:itemId')
    .delete(users.requiresLogin, cart.delete);
  app.param('itemId', cart.itemByID);
};
