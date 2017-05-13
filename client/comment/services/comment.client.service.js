angular.module('comment').factory('Comment', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/stuff/:stuffId/comment/:commentId', {}, {
        update: {
            method: 'PUT',
            params: {
                commentId: '@comment'
            }
        }
    })
}]);