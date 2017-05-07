angular.module('user').controller('userCtrl', ['$scope', 'User', 'currentUser', '$log', '$state', 'NotificationService', function($scope, User, currentUser, $log, $state, NotificationService){

    $scope.user = currentUser;

    $scope.user_menu = [
        {
            name: 'Profile',
            action: '.profile',
            icon: 'face'
        }
    ];

    $scope.signin = function (user) {
        User.signin(user,
            function (res) {
            $state.go($state.current.name,{},{reload: true})
        }, function (err) {
                var message = err.data ? err.data.message : 'Connection error';
                $log.error(message);
                NotificationService.show(message, 'bottom');
        })
    };

    $scope.signout = function () {
        User.signout(function (res) {
            $scope.user = undefined;
            $state.go($state.current.name,{},{reload: true});
        }, function (err) {
            var message = err.data ? err.data.message : 'Connection error';
            $log.error(message);
            NotificationService.show(message, 'bottom');
        });
    }
}]);