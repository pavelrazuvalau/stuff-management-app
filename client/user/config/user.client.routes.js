angular.module('user').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.signup', {
                url: '/signup',
                templateUrl: 'views/signup.client.view.html',
                controller: 'signupCtrl'
            })

            .state('app.profile', {
                url: '/profile',
                templateUrl: 'views/profile.client.view.html',
                controller: 'ProfileCtrl'
            })
    }
]);