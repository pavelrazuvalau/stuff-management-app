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
  Cart.update({
    user: req.user
  }, {
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
  }).populate('stuff.item').lean()
  .exec(function(err, cart){
    if (err) {
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      if (cart){
        var sum = 0;
        for (var i = 0; i < cart.stuff.length; i++){
          sum += (cart.stuff[i].item.cost * cart.stuff[i].count);
        }
        cart.sum = sum.toFixed(2);
        res.jsonp(cart);
      }
      else {
        res.jsonp(null);
      }
    }
  });
}

exports.delete = function(req, res){
  Cart.update({
    user: req.user
  }, {
    $pull: {
      stuff: {
        item: req.params.stuffId
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
