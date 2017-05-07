angular.module('ui').controller('uiCtrl', ['$scope', '$mdSidenav', '$log', 'ToolbarService', 'SearchService', function ($scope, $mdSidenav, $log, ToolbarService, SearchService) {
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID).toggle();
        };
    }

    $scope.closeLeft = function(){
        $mdSidenav('left').close();
    };

    $scope.menu = [
        {
            name: 'home',
            action: '.home',
            icon: 'home'
        }, {
            name: 'stuff',
            action: '.stuff',
            icon: 'local_mall'
        }, {
            name: 'about',
            action: '.about',
            icon: 'info'
        }
    ];

    $scope.toolbar = ToolbarService.get();

    $scope.updateQuery = function () {
        SearchService.setQuery($scope.searchQuery);
    };
}]);
