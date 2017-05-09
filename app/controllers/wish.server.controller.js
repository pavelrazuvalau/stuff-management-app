var Wish = require('mongoose').model('Wish');

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
  Wish.update({
    user: req.user
  }, {
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
  Wish.findOne({
    user: req.user
  }).populate('stuff', 'stufftype name image cost')
  .exec(function(err, wish){
    if (err) {
      res.status(400).send({message: getErrorMessage(err)})
    } else {
      res.jsonp(wish ? wish : null);
    }
  });
}

exports.delete = function(req, res){
  Wish.update({
    user: req.user
  }, {
    $pull: {
      stuff: req.params.wishId
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
  Wish.update({
    user: req.user
  }, {
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
