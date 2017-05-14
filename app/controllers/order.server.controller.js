var Order = require('mongoose').model('Order'),
    Cart  = require('mongoose').model('Cart');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.make = function (req, res) {
  Cart.findOne({
    user: req.user
  }, function (err, cart) {
    if (err){
      res.status(400).send({
        message: getErrorMessage(err)
      });
    }
    else {
      if (cart){
        var order = new Order();
        order.user = req.user;
        order.stuff = cart.stuff;
        order.comment = req.body.comment;
        order.save(function (err, orders) {
          if (err) {
            res.status(400).send({
              message: getErrorMessage(err)
            });
          } else {
            Cart.update({
              user: req.user
            },{
              $set: {
                stuff: []
              }
            }, function (err) {
              if (err){
                res.status(400).send({message: getErrorMessage(err)})
              }
              else {
                res.sendStatus(200);
              }
            })
          }
        })
      }
      else {
        res.status(400).send({
          message: 'Cart is empty'
        });
      }
    }
  })
}

exports.get = function (req, res) {
  Order.find({
    user: req.user
  }).populate('stuff.item').lean()
  .exec(function(err, orders){
    if (err) {
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      if (orders){
        for (var i = 0; i < orders.length; i++){
          var sum = 0;
          for (var j = 0; j < orders[i].stuff.length; j++){
            sum += (orders[i].stuff[j].item.cost * orders[i].stuff[j].count);
          }
          orders[i].sum = sum.toFixed(2);
        }
        res.jsonp(orders);
      }
      else {
        res.jsonp(null);
      }
    }
  });
}

exports.getAll = function (req, res) {
  Order.find().populate('stuff.item').populate('user').exec(function (err, orders) {
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      if (orders){
        for (var i = 0; i < orders.length; i++){
          var sum = 0;
          for (var j = 0; j < orders[i].stuff.length; j++){
            sum += (orders[i].stuff[j].item.cost * orders[i].stuff[j].count);
          }
          orders[i].sum = sum.toFixed(2);
        }
        res.jsonp(orders);
      }
      else {
        res.jsonp(null);
      }
    }
  })
}

exports.delete = function (req, res) {
  var order = req.order;

  order.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.sendStatus(200);
    }
  });
}

exports.pay = function (req, res, next) {
  req.order.status = 'Processing';
  next();
}

exports.finish = function (req, res, next) {
  req.order.status = 'Finished';
  next();
}

exports.cancel = function (req, res, next) {
  req.order.status = 'Canceled';
  next();
}

exports.update = function (req, res) {
  var order = req.order;
  order.statusComment = req.body.comment;

  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.sendStatus(200);
    }
  });
}

exports.findByID = function (req, res, next, id) {
  Order.findById(id, function(err, order){
    if (err) return next(err);
    if (!order) return next(new Error('Failed to load order ' + id));
    req.order = order;
    next();
  })
}

exports.hasAuthorization = function(req, res, next) {
  if (req.user.role != 'Admin') {
    return res.status(403).send({
      message: 'Access denied'
    });
  }
  next();
};
