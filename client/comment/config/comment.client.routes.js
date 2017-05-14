angular.module('comment').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.comments', {
                url: '/comments',
                views: {
                    '@app': {
                        templateUrl: 'views/comment.client.view.html',
                        controller: 'commentCtrl'
                    }
                }
            })
    }]);