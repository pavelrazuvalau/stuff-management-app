angular.module('wish').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.wish', {
                url: '/wish',
                views: {
                    '@app': {
                        templateUrl: 'views/wish.client.view.html',
                        controller: 'wishCtrl'
                    }
                }
            })
    }
]);