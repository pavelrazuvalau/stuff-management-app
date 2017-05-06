angular.module('user').controller('userCtrl', ['$scope', 'User', 'currentUser', '$log', '$state', 'NotificationService', function($scope, User, currentUser, $log, $state, NotificationService){

    $scope.user = currentUser;

    $scope.user_menu = [
        {
            name: 'Profile',
            action: '.profile'
        }
    ];

    $scope.signin = function (user) {
        User.signin(user,
            function (res) {
            $state.go($state.current.name,{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'bottom');
        })
    };

    $scope.signout = function () {
        User.signout(function (res) {
            $scope.user = undefined;
            $state.go($state.current.name,{},{reload: true});
        }, function (err) {
            log.error(err.data.message);
            NotificationService.show(err.data.message, 'right bottom');
        });
    }
}]);