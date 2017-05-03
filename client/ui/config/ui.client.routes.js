angular.module('ui').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            .state('app', {
                abstract: true,
                views: {
                    'sidenav': {
                        templateProvider: ['User', 'CurrentUser', '$log', function (User, CurrentUser, $log) {
                            var res = CurrentUser.get();

                            if (res){
                                CurrentUser.set(res);
                                return '<div ng-include="\'views/user.client.view.html\'"></div>';
                            }
                            return '<div ng-include="\'views/login.client.view.html\'"></div>';
                        }],
                        controller: 'userCtrl'
                    },
                    '': {
                        templateUrl: 'views/content.client.view.html'
                    }
                }
            })

            .state('app.home', {
                url: '/home',
                templateUrl: 'views/home.client.view.html'
            })

            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about.client.view.html'
            })
    }
]);