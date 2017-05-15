angular.module('user').controller('userAllCtrl', [
    '$scope',
    '$state',
    'userList',
    'UserManager',
    'currentUser',
    'ToolbarService',
    'TitleService',
    'NotificationService',
    'ErrorHandler',
    function ($scope,
              $state,
              userList,
              UserManager,
              currentUser,
              ToolbarService,
              TitleService,
              NotificationService,
              ErrorHandler) {
        if (currentUser.role !== 'Admin'){
            $state.go('app.stuff');
            NotificationService.show('Access denied');
        }
        else {
            ToolbarService.set('User Management', null, null, null);
            TitleService.set('User Management');
            $scope.users = userList;
            $scope.roles = ['User', 'Moderator', 'Admin'];

            $scope.grantRole = function (id, role) {
                UserManager.save({userId: id}, {role: role}, function (res) {
                    NotificationService.show('Permissions were granted');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            };

            $scope.delete = function (id) {
                UserManager.delete({userId: id}, function (res) {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('User was deleted');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
        }
    }
]);