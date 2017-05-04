angular.module('user').controller('userCtrl', ['$scope', 'User', 'CurrentUser', '$log', '$state', 'NotificationService', function($scope, User, CurrentUser, $log, $state, NotificationService){

    if (!CurrentUser.get()) {
        User.get(function (res) {
            if (res.username) {
                CurrentUser.set(res);
                $state.go($state.current.name,{},{reload: true});
            }
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'right bottom');
        });
    }

    $scope.user = CurrentUser.get();

    $scope.user_menu = [
        {
            name: 'Profile',
            action: '.profile'
        }
    ];

    $scope.signin = function (user) {
        User.signin(user,
            function (res) {
            CurrentUser.set(undefined);
            $state.go($state.current.name,{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'bottom');
        })
    };

    $scope.signout = function () {
        User.signout(function (res) {
            CurrentUser.set(undefined);
            $scope.user = undefined;
            $state.go('app.home',{},{reload: true});
        }, function (err) {
            log.error(err.data.message);
            NotificationService.show(err.data.message, 'right bottom');
        });
    }
}]);