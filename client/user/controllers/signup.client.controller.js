angular.module('user').controller('signupCtrl', ['$scope', 'User', 'CurrentUser', '$log', '$state', 'NotificationService', function ($scope, User, CurrentUser, $log, $state, NotificationService) {
    if (CurrentUser.get()){
        $state.go('app.home', {}, {reload: true});
    }

    $scope.signup = function () {
        User.signup($scope.reg,
            function (res) {
            $state.go('app.home',{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'right bottom');
        })
    }
}]);