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
                var message = err.data ? err.data.message : 'Connection error';
                $log.error(message);
                NotificationService.show(message, 'right bottom');
            })
    };
}]);