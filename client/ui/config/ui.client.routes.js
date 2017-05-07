angular.module('ui').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            .state('app', {
                abstract: true,
                resolve: {
                    User: 'User',
                    currentUser: function ($q, $log, User, NotificationService) {
                        var defer = $q.defer();

                        var promise = User.get().$promise;

                        promise.then(function (res) {
                            defer.resolve(res);
                        }).catch(function (err) {
                            var message = err.data ? err.data.message : 'Connection error';
                            $log.error(message);
                            NotificationService.show(message, 'bottom');
                        });

                        return defer.promise;
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
                        templateUrl: 'views/sidenav.client.view.html'
                    },
                    '': {
                        templateUrl: 'views/content.client.view.html'
                    }
                }
            })

            .state('app.home', {
                url: '/home',
                templateUrl: 'views/home.client.view.html',
                controller: 'homeCtrl'
            })

            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about.client.view.html'
            })
    }
]);