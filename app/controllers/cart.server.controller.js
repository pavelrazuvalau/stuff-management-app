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
    $inc: {
      sum: req.body.cost
    },
    $push: {
      stuff: req.body
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
  }).populate('stuff', 'stufftype name image cost')
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
      sum: -req.stuff.cost
    },
    $pull: {
      stuff: req.stuff._id
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
