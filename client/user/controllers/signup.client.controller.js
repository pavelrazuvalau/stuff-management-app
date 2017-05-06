angular.module('user').controller('signupCtrl', ['$scope', 'User', 'currentUser', '$log', '$state', 'NotificationService', 'ToolbarService', 'TitleService', function ($scope, User, currentUser, $log, $state, NotificationService, ToolbarService, TitleService) {
    if (currentUser.username){
        $state.go('app.home');
    }

    ToolbarService.set('Sign up', null, false, false);
    TitleService.set('Sign up');

    $scope.signup = function () {
        User.signup($scope.reg,
            function (res) {
                $state.go('app.home',{},{reload: true})
            }, function (err) {
                $log.error(err.data.message);
                NotificationService.show(err.data.message, 'right bottom');
            })
    };
}]);