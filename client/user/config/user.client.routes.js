angular.module('user').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.signup', {
                url: '/signup',
                data: {
                    needsUser: false
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
                data: {
                    needsUser: true
                },
                views: {
                    '@app': {
                        templateUrl: 'views/profile.client.view.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })
    }
]);