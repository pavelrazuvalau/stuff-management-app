angular.module('user').controller('ProfileCtrl', ['$scope', 'currentUser', 'ToolbarService', 'TitleService', '$state', function ($scope, currentUser, ToolbarService, TitleService, $state) {
    if (!currentUser.username){
        $state.go('app.stuff');
    }

    $scope.info = currentUser;
    ToolbarService.set('Profile', null, false, false);
    TitleService.set($scope.info.fullName + ' - ' + 'Profile');
}]);