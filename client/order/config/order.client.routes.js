angular.module('stuff').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.orders', {
                url: '/orders',
                resolve: {
                    checkOrder: function (currentUser, $state, NotificationService) {
                        if(!currentUser.username) {
                            $state.go('app.stuff', {}, {reload: true});
                            NotificationService.show('Access denied');
                        }
                    },
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
            })
            .state('app.orders.all', {
                url: '/all',
                resolve: {
                    OrderAll: 'OrderAll',
                    orderList: function ($q, $state, NotificationService, ErrorHandler, OrderAll, currentUser) {
                        if (currentUser.role == 'Admin'){
                            var defer = $q.defer();

                            var promise = OrderAll.query().$promise;

                            promise.then(function (res) {
                                defer.resolve(res);
                            }).catch(function (err) {
                                ErrorHandler.show(err);
                                defer.reject();
                            });

                            return defer.promise;
                        }
                        else {
                            $state.go('app.stuff', {}, {reload: true})
                            NotificationService.show('Access denied');
                        }
                    }
                },
                views: {
                    '@app': {
                        templateUrl: 'views/allorders.client.view.html',
                        controller: 'allOrdersCtrl'
                    }
                }
            });
    }]);