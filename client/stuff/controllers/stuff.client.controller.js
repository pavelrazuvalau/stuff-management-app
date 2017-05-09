angular.module('stuff').controller('stuffCtrl', ['$scope', 'Stuff', 'ToolbarService', 'currentUser', 'TitleService', 'SearchService', '$log', 'NotificationService', 'CheckboxService', function ($scope, Stuff, ToolbarService, currentUser, TitleService, SearchService, $log, NotificationService, CheckboxService) {
    ToolbarService.set(null, null, true);
    TitleService.set('Stuff');
    Stuff.query(function (res) {
        $scope.list = res;
    }, function (err) {
        var message = err.data ? err.data.message : 'Connection error';
        $log.error(message);
        NotificationService.show(message, 'right bottom');
    });
    if (currentUser.role === 'Admin'){
        $scope.addButton = true;
    }

    $scope.types = ['T-shirt', 'Cup', 'Pillow', 'Badge', 'Sticker', 'Сase'];
    $scope.selected = CheckboxService.get();

    $scope.toggle = function (type, list) {
        var idx = list.indexOf(type);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(type);
        }
        CheckboxService.set($scope.selected);
    };

    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    var update = function () {
        $scope.query = SearchService.getQuery();
    };

    update();

    SearchService.setCB(update);

    $scope.search = function (item) {
        return (angular.lowercase(item.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(item.stufftype).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };

    $scope.checkbox = function (item) {
        if ($scope.selected.length){
            return $scope.selected.indexOf(item.stufftype) > -1;
        }
        else return true;
    }
}]);