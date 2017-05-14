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
                views: {
                    '@app': {
                        templateUrl: 'views/alluser.client.view.html',
                        controller: 'userAllCtrl'
                    }
                }
            })
    }
]);