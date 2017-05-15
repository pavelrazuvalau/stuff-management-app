angular.module('cart').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.cart', {
                url: '/cart',
                resolve: {
                    checkCart: function (currentUser, $state, NotificationService) {
                        if(!currentUser.username) {
                            $state.go('app.stuff', {}, {reload: true});
                            NotificationService.show('Access denied');
                        }
                    }
                },
                views: {
                    '@app': {
                        templateUrl: 'views/cart.client.view.html',
                        controller: 'cartCtrl'
                    }
                }
            })
    }
]);