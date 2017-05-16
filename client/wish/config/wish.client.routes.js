angular.module('wish').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.wish', {
                url: '/wish',
                resolve: {
                    checkWish: function (currentUser, $state, NotificationService) {
                        if(!currentUser.username) {
                            $state.go('app.stuff', {}, {reload: true});
                            NotificationService.show('Access denied');
                        }
                    }
                },
                views: {
                    '@app': {
                        templateUrl: 'views/wish.client.view.html',
                        controller: 'wishCtrl'
                    }
                }
            })
    }
]);