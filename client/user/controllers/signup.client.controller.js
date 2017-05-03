angular.module('user').controller('signupCtrl', ['$scope', 'User', '$log', '$state', 'NotificationService', function ($scope, User, $log, $state, NotificationService) {
    $scope.signup = function () {
        User.signup($scope.reg,
            function (res) {
            $state.go('app.home',{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
            NotificationService.show(err.data.message, 'bottom right');
        })
    }
}]);