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
            action: '.home'
        }, {
            name: 'stuff',
            action: '.stuff'
        }, {
            name: 'about',
            action: '.about'
        }
    ];

    $scope.toolbar = ToolbarService.get();

    $scope.updateQuery = function () {
        SearchService.setQuery($scope.searchQuery);
    };
}]);
