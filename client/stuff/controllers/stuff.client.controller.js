angular.module('stuff').controller('stuffCtrl', ['$scope', 'Stuff', 'ToolbarService', 'currentUser', 'TitleService', function ($scope, Stuff, ToolbarService, currentUser, TitleService) {
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
}]);