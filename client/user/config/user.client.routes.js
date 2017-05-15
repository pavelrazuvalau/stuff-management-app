angular.module('user').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.signup', {
                url: '/signup',
                resolve: {
                  checkUser: function (currentUser, $state, NotificationService) {
                      if(currentUser.username) {
                          $state.go('app.stuff', {}, {reload: true})
                          NotificationService.show('You are already signed up');
                      }
                  }
                },
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
                    userList: function ($q, $state, ErrorHandler, NotificationService, User, currentUser) {
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
                        else {
                            $state.go('app.stuff', {}, {reload: true})
                            NotificationService.show('Access denied');
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