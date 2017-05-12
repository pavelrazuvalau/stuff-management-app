var users    = require('../../app/controllers/users.server.controller'),
    cart     = require('../../app/controllers/cart.server.controller'),
    order    = require('../../app/controllers/order.server.controller');

module.exports = function(app) {
  app.route('/order')
    .get(users.requiresLogin, order.get)
    .post(users.requiresLogin, order.make);
  app.route('/order/all')
    .get(users.requiresLogin, order.hasAuthorization, order.getAll);
  app.route('/order/:orderId')
    .delete(users.requiresLogin, order.hasAuthorization, order.delete)
  app.get('/order/:orderId/status/:action', users.requiresLogin,
                                       order.hasAuthorization,
                                       order.findByID,
                                       order.changeStatus,
                                       order.update);
  app.get('/order/:orderId/pay', users.requiresLogin, order.pay, order.update);
  app.param('orderId', order.findByID);
};
