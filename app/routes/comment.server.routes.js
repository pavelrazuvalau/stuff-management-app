var users      = require('../../app/controllers/users.server.controller'),
    stuff      = require('../../app/controllers/stuff.server.controller');
    comment    = require('../../app/controllers/comment.server.controller');

module.exports = function(app) {
  app.route('/stuff/:stuffId/comment')
    .post(users.requiresLogin, comment.add)
  app.route('/stuff/:stuffId/comment/:commentId')
    .put(users.requiresLogin, comment.hasAuthorization, comment.edit)
    .delete(users.requiresLogin, comment.hasAuthorization, comment.delete);
  app.get('/comments', users.requiresLogin, comment.hasPermissions, comment.get);
  app.param('stuffId', stuff.findByID);
  app.param('commentId', comment.findByID);
};
