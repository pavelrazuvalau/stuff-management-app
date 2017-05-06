angular.module('stuff').controller('stuffCtrl', ['$scope', 'Stuff', 'ToolbarService', 'currentUser', 'TitleService', 'SearchService', function ($scope, Stuff, ToolbarService, currentUser, TitleService, SearchService) {
    ToolbarService.set(null, null, true);
    TitleService.set('Stuff');
    Stuff.query(function (res) {
        $scope.list = res;
    }, function (err) {
        NotificationService.show(err.data.message, 'right bottom')
    });
    if (currentUser.role == 'Admin'){
        $scope.addButton = true;
    }
    var update = function () {
        $scope.query = SearchService.getQuery();
        console.log(SearchService.getQuery());
    };

    update();

    SearchService.setCB(update);

    $scope.search = function (item) {
        return (angular.lowercase(item.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(item.stufftype).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };
}]);