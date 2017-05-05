angular.module('user').controller('ProfileCtrl', ['$scope', 'CurrentUser', 'ToolbarService', 'TitleService', '$state', function ($scope, CurrentUser, ToolbarService, TitleService, $state) {
    if (!CurrentUser.get()){
        $state.go('app.home', {}, {reload: true});
    }
    else {
        $scope.info = CurrentUser.get();
        ToolbarService.setToolbar('Profile', ['Test'], false);
        TitleService.set($scope.info.fullName + ' - ' + 'Profile');
    }
}]);