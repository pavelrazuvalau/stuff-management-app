var Comment = require('mongoose').model('Comment');

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
  Comment.find({
    $and: [ { user: req.user._id }, { stuff: req.stuff._id } ]
  }, function (err, comment) {
    if (err){
      res.status(400).send({message: getErrorMessage(err)})
    }
    else {
      if (comment.length){
        res.status(400).send({message: 'You have already written the comment'})
      }
      else {
        var comment = new Comment(req.body);
        comment.user = req.user;
        comment.stuff = req.stuff;
        comment.save(function (err) {
          if (err){
            res.status(400).send({message: getErrorMessage(err)})
          }
          else {
            res.sendStatus(200);
          }
        })
      }
    }
  })
}

exports.edit = function (req, res) {
  var comment = req.comment;
  comment.message = req.body.message;
  comment.rating = req.body.rating;
  comment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.sendStatus(200);
    }
  });
}

exports.delete = function (req, res) {
  var comment = req.comment;

  comment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.sendStatus(200);
    }
  });
}

exports.findByID = function(req, res, next, id){
  Comment.findById(id).populate('user').exec(function(err, comment){
    if (err) return next(err);
    if (!comment) {
      res.status(404).send({message: 'Comment not found'});
    };
    req.comment = comment;
    next();
  })
}

exports.hasAuthorization = function(req, res, next) {
  if (!(req.comment.user.id == req.user.id || req.user.role == 'Admin' || req.user.role == 'Moderator')) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};
