angular.module('stuff').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.stuff', {
                url: '/stuff',
                resolve: {
                    Stuff: 'Stuff',
                    currentList: function ($q, ErrorHandler, Stuff) {
                        var defer = $q.defer();

                        var promise =  Stuff.query().$promise;

                        promise.then(function (res) {
                            defer.resolve(res);
                        }).catch(function (err) {
                            ErrorHandler.show(err);
                            defer.reject();
                        });

                        return defer.promise;
                    }
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
                    currentStuff: function ($q, ErrorHandler, Stuff, $stateParams) {
                        var defer = $q.defer();

                        var promise = Stuff.get({stuffId: $stateParams.stuffId}).$promise;

                        promise.then(function (res) {
                            var sum = 0;
                            for(var i = 0; i < res.comments.length; i++){
                                sum += res.comments[i].rating;
                            }
                            var avg = (sum / res.comments.length);

                            res.avg = avg;
                            defer.resolve(res);
                        }).catch(function (err) {
                            ErrorHandler.show(err);
                            defer.reject();
                        });

                        return defer.promise;
                    }
                },
                params: {
                    backAction: null
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
                    default: null,
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