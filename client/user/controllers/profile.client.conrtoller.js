angular.module('user').controller('ProfileCtrl', ['$scope', 'currentUser', 'ToolbarService', 'TitleService', '$state', function ($scope, currentUser, ToolbarService, TitleService, $state) {
    if (!currentUser.username){
        $state.go('app.home');
    }

    $scope.info = currentUser;
    ToolbarService.set('Profile', ['Edit profile'], false, false);
    TitleService.set($scope.info.fullName + ' - ' + 'Profile');
}]);