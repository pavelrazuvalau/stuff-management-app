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
    .delete(users.requiresLogin, order.hasAuthorization, order.delete);
  app.post('/order/:orderId/finish', users.requiresLogin,
                                       order.hasAuthorization,
                                       order.findByID,
                                       order.finish,
                                       order.update);
  app.post('/order/:orderId/cancel', users.requiresLogin,
                                       order.hasAuthorization,
                                       order.findByID,
                                       order.cancel,
                                       order.update);
  app.get('/order/:orderId/pay', users.requiresLogin, order.pay, order.update);
  app.param('orderId', order.findByID);
};
