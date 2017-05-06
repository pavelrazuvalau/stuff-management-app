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
                parent: 'app.stuff',
                url: '/add',
                views: {
                    '@app': {
                        templateUrl: 'views/addstuff.client.view.html',
                        controller: 'addStuffCtrl'
                    }
                }
            })
    }
]);