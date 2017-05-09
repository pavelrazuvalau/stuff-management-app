angular.module('ui').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/stuff');

        $stateProvider

            .state('app', {
                abstract: true,
                resolve: {
                    User: 'User',
                    currentUser: function ($q, ErrorHandler, User) {
                        var defer = $q.defer();

                        var promise = User.get().$promise;

                        promise.then(function (res) {
                            defer.resolve(res);
                        }).catch(function (err) {
                            ErrorHandler.show(err);
                            defer.reject();
                        });

                        return defer.promise;
                    },
                    Wish: 'Wish',
                    wishList: function ($q, ErrorHandler, Wish, currentUser) {
                        if (currentUser.username){
                            var defer = $q.defer();

                            var promise = Wish.get().$promise;

                            promise.then(function (res) {
                                defer.resolve(res);
                            }).catch(function (err) {
                                ErrorHandler.show(err);
                                defer.reject();
                            });

                            return defer.promise;
                        }
                    },
                    Cart: 'Cart',
                    currentCart: function ($q, ErrorHandler, Cart, currentUser) {
                        if (currentUser.username){
                            var defer = $q.defer();

                            var promise = Cart.get().$promise;

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
                    'user': {
                        templateProvider:function (currentUser) {
                            if (currentUser.username){
                                return '<div ng-include="\'views/user.client.view.html\'"></div>';
                            }
                            else {
                                return '<div ng-include="\'views/login.client.view.html\'"></div>';
                            }
                        },
                        controller: 'userCtrl'
                    },
                    'sidenav': {
                        templateUrl: 'views/sidenav.client.view.html',
                        controller: 'sidenavCtrl'
                    },
                    '': {
                        templateUrl: 'views/content.client.view.html'
                    }
                }
            })
    }
]);