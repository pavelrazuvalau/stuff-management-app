angular.module('stuff').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.stuff', {
                url: '/stuff',
                resolve: {
                    Stuff: 'Stuff',
                    currentList: function ($q, $log, Stuff, NotificationService) {
                        var defer = $q.defer();

                        var promise =  Stuff.query().$promise;

                        promise.then(function (res) {
                            defer.resolve(res);
                        }).catch(function (err) {
                            var message = err.data ? err.data.message : 'Connection error';
                            $log.error(err);
                            NotificationService.show(message, 'bottom');
                            defer.reject();
                        });

                        return defer.promise;
                    },
                },
                views: {
                    '@app': {
                        templateUrl: 'views/stuff.client.view.html',
                        controller: 'stuffCtrl'
                    }
                }
            })

            .state('app.stuff.add', {
                url: '/add',
                views: {
                    '@app': {
                        templateUrl: 'views/addstuff.client.view.html',
                        controller: 'addStuffCtrl'
                    }
                }
            })

            .state('app.stuff.details', {
                url: '/:stuffId',
                resolve: {
                    currentStuff: function ($q, $log, Stuff, $stateParams, NotificationService) {
                        var defer = $q.defer();

                        var promise = Stuff.get({stuffId: $stateParams.stuffId}).$promise;

                        promise.then(function (res) {
                            defer.resolve(res);
                        }).catch(function (err) {
                            var message = err.data ? err.data.message : 'Connection error';
                            $log.error(err);
                            NotificationService.show(message, 'bottom');
                            defer.reject();
                        });

                        return defer.promise;
                    }
                },
                views: {
                    '@app': {
                        templateUrl: 'views/details.client.view.html',
                        controller: 'stuffDetailsCtrl'
                    }
                }
            })

            .state('app.stuff.details.edit', {
                url: '/edit',
                params: {
                    default: null
                },
                views: {
                    '@app': {
                        templateUrl: 'views/editstuff.client.view.html',
                        controller: 'editStuffCtrl'
                    }
                }
            })
    }
]);