var Stuff = require('mongoose').model('Stuff');

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

exports.add = function(req, res) {
  var stuff = new Stuff(req.body);
  stuff.save(function(err) {
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.sendStatus(200);
    }
  });
};

exports.get = function (req, res) {
  Stuff.find(function(err, stuff){
    if (err) {
      res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.jsonp(stuff);
    }
  })
}

exports.findByID = function(req, res, next, id){
  Article.findById(id, function(err, stuff){
    if (err) return next(err);
    if (!stuff) return next(new Error('Failed to load stuff ' + id));
    req.stuff = stuff;
    next();
  })
}

exports.getByID = function(req, res){
  res.jsonp(req.stuff);
}

exports.update = function(req, res){
  var stuff = req.stuff;

  stuff.stufftype = req.body.stufftype;
  stuff.name = req.body.name;
  stuff.description = req.body.description;
  stuff.cost = req.body.cost;

  stuff.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.jsonp(stuff);
    }
  });
}

exports.delete = function(req, res){
  var stuff = req.stuff;

  stuff.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.jsonp(stuff);
    }
  });
}

exports.hasAuthorization = function(req, res, next) {
  if (req.user.role != 'Admin') {
    return res.status(403).send({
      message: 'Access denied'
    });
  }
  next();
};
