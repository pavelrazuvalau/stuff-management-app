angular.module('comment').controller('commentCtrl', [
    '$scope',
    '$state',
    'currentUser',
    'commentList',
    'Comment',
    'ToolbarService',
    'TitleService',
    'NotificationService',
    'ErrorHandler',
    function ($scope, 
              $state,
              currentUser,
              commentList,
              Comment,
              ToolbarService,
              TitleService,
              NotificationService,
              ErrorHandler) {
            ToolbarService.set('Comments', null, null, null);
            TitleService.set('Comments');
            $scope.comments = commentList;

            $scope.remove = function (stuffId, commentId) {
                Comment.delete({stuffId: stuffId, commentId: commentId}, function (res) {
                    NotificationService.show('Comment has been removed');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
    }
]);