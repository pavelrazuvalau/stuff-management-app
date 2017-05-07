angular.module('stuff').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('app.stuff', {
                url: '/stuff',
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