var config = require('./config'),
mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(config.db);

  require('../app/models/user.server.model');
  require('../app/models/stuff.server.model');
  require('../app/models/wish.server.model');
  require('../app/models/cart.server.model');
  require('../app/models/order.server.model');

  return db;
};
