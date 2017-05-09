angular.module('user').controller('userCtrl', ['$scope', 'User', 'currentUser', 'ErrorHandler', '$state', 'NotificationService', function($scope, User, currentUser, ErrorHandler, $state, NotificationService){

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
                ErrorHandler.show(err);
        })
    };

    $scope.signout = function () {
        User.signout(function (res) {
            $scope.user = undefined;
            $state.go($state.current.name,{},{reload: true});
        }, function (err) {
            ErrorHandler.show(err);
        });
    }
}]);