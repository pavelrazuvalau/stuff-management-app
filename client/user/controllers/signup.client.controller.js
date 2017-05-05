angular.module('user').controller('signupCtrl', ['$scope', 'User', 'CurrentUser', '$log', '$state', 'NotificationService', 'ToolbarService', 'TitleService', function ($scope, User, CurrentUser, $log, $state, NotificationService, ToolbarService, TitleService) {
    if (CurrentUser.get()){
        $state.go('app.home', {}, {reload: true});
    }

    ToolbarService.setToolbar('Sign up', null, false);
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