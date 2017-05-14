angular.module('user').controller('ProfileCtrl', [
    '$scope',
    'User',
    'currentUser',
    'ToolbarService',
    'TitleService',
    'NotificationService',
    'ErrorHandler',
    '$state',
    function ($scope,
              User,
              currentUser,
              ToolbarService,
              TitleService,
              NotificationService,
              ErrorHandler,
              $state) {

        if (!currentUser.username){
            $state.go('app.stuff');
        }

        else {
            $scope.info = currentUser;
            ToolbarService.set('Profile', null, false, false);
            TitleService.set($scope.info.fullName + ' - ' + 'Profile');

            $scope.edit = function () {
                $scope.editUser = angular.copy(currentUser);
                $scope.editForm = true;
            };

            $scope.cancel = function () {
                $scope.editForm = false
            };

            $scope.submit = function () {
                User.save($scope.editUser, function (res) {
                    console.log(res);
                    NotificationService.show('Info has been edited');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
        }
    }
]);