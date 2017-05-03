angular.module('user').controller('signupCtrl', ['$scope', 'User', '$log', '$state', function ($scope, User, $log, $state) {
    $scope.signup = function () {
        User.signup($scope.reg,
            function (res) {
            $state.go('app.home',{},{reload: true})
        }, function (err) {
            $log.error(err.data.message);
        })
    }
}]);