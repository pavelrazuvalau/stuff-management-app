angular.module('stuff').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.orders', {
                url: '/orders',
                resolve: {
                    Order: 'Order',
                    currentOrders: function ($q, ErrorHandler, Order, currentUser) {
                        if (currentUser.username) {
                            var defer = $q.defer();

                            var promise = Order.query().$promise;

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
                        templateUrl: 'views/order.client.view.html',
                        controller: 'orderCtrl'
                    }
                }
            });
    }]);