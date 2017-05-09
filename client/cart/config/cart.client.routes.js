angular.module('cart').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.cart', {
                url: '/cart',
                views: {
                    '@app': {
                        templateUrl: 'views/cart.client.view.html',
                        controller: 'cartCtrl'
                    }
                }
            })
    }
]);