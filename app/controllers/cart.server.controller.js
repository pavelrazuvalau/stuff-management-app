var Cart = require('mongoose').model('Cart');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.add = function (req, res) {
  console.log(req.body);
  Cart.update({
    user: req.user
  }, {
    $inc: {
      sum: req.body.item.cost * req.body.count
    },
    $push: {
      stuff: {
        item: req.body.item,
        count: req.body.count
      }
    }
  }, {
    upsert: true
  }, function(err){
    if (err){
      res.status(400).send({message: getErrorMessage(err)})
    }
    else {
      res.sendStatus(200);
    }
  })
}

exports.get = function (req, res) {
  Cart.findOne({
    user: req.user
  }).populate('stuff.item')
  .exec(function(err, cart){
    if (err) {
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      res.jsonp(cart ? cart : null);
    }
  });
}

exports.delete = function(req, res){
  Cart.update({
    user: req.user
  }, {
    $inc: {
      sum: -req.item.cost * req.count
    },
    $pull: {
      stuff: {
        item:   req.item._id
      }
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

exports.clear = function (req, res) {
  Cart.update({
    user: req.user
  },{
    $set: {
      stuff: [],
      sum: 0.00
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

exports.itemByID = function (req, res, next, id) {
  Cart.findOne({
    user: req.user
  }, {
    stuff: {
      $elemMatch: {_id: id}
    }
  }).populate('stuff.item')
  .exec(function(err, cart){
    if (err) {
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      console.log(cart.stuff);
      req.item = cart.stuff[0].item;
      req.count = cart.stuff[0].count;
      next();
    }
  });
}
