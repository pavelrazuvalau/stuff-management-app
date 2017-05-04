angular.module('user').controller('ProfileCtrl', ['$scope', 'CurrentUser', 'ToolbarService', '$state', function ($scope, CurrentUser, ToolbarService, $state) {
    if (!CurrentUser.get()){
        $state.go('app.home', {}, {reload: true});
    }

    $scope.info = CurrentUser.get();
    ToolbarService.setToolbar('Profile', ['Test'], false);
}]);