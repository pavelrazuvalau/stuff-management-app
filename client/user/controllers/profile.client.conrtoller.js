angular.module('user').controller('ProfileCtrl', [
    '$scope',
    'User',
    'currentUser',
    'ToolbarService',
    'TitleService',
    '$state',
    function ($scope,
              User,
              currentUser,
              ToolbarService,
              TitleService,
              $state) {

        if (!currentUser.username){
            $state.go('app.stuff');
        }

        else {
            $scope.info = currentUser;
            ToolbarService.set('Profile', null, false, false);
            TitleService.set($scope.info.fullName + ' - ' + 'Profile');
        }

        $scope.edit = function () {
            $scope.editUser = angular.copy(currentUser);
            $scope.editForm = true;
        };

        $scope.cancel = function () {
          $scope.editForm = false
        }
    }
]);