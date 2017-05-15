angular.module('comment').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.comments', {
                url: '/comments',
                resolve: {
                    CommentAll: 'CommentAll',
                    commentList: function ($q, ErrorHandler, CommentAll, currentUser) {
                        if (currentUser.role == 'Admin' || currentUser.role == 'Moderator'){
                            var defer = $q.defer();

                            var promise = CommentAll.query().$promise;

                            promise.then(function (res) {
                                defer.resolve(res);
                            }).catch(function (err) {
                                ErrorHandler.show(err);
                                defer.reject();
                            });

                            return defer.promise;
                        }
                    }
                },
                views: {
                    '@app': {
                        templateUrl: 'views/comment.client.view.html',
                        controller: 'commentCtrl'
                    }
                }
            })
    }]);