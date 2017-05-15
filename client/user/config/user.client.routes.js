angular.module('user').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.signup', {
                url: '/signup',
                views: {
                    '@app': {
                        templateUrl: 'views/signup.client.view.html',
                        controller: 'signupCtrl'
                    }
                }

            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    '@app': {
                        templateUrl: 'views/profile.client.view.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('app.users', {
                url: '/users',
                resolve: {
                    User: 'User',
                    userList: function ($q, ErrorHandler, User, currentUser) {
                        if (currentUser.role == 'Admin'){
                            var defer = $q.defer();

                            var promise = User.getAll().$promise;

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
                        templateUrl: 'views/alluser.client.view.html',
                        controller: 'userAllCtrl'
                    }
                }
            })
    }
]);