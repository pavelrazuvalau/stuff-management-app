angular.module('user').controller('signupCtrl', ['$scope', 'User', 'CurrentUser', '$log', '$state', 'NotificationService', 'ToolbarService', function ($scope, User, CurrentUser, $log, $state, NotificationService, ToolbarService) {
    if (CurrentUser.get()){
        $state.go('app.home', {}, {reload: true});
    }

    ToolbarService.setToolbar('Sign up', null, false);

    $scope.signup = function () {
        User.signup($scope.reg,
            function (res) {
            $state.go('app.home',{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'right bottom');
        })
    };

    $scope.checkUsername = function () {
        $log.log($scope.reg.username);
        User.checkUsername({username: $scope.reg.username},
            function (res) {
                NotificationService.show('Username is available', 'right bottom');
                signup_form.username.$setValidity('usernameAvailable', true);
            }, function (err) {
                NotificationService.show('Username is already taken', 'right bottom');
                signup_form.username.$setValidity('usernameAvailable', false);
        })
    }
}]);