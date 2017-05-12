angular.module('user').controller('signupCtrl', [
    '$scope',
    'User',
    'currentUser',
    'ErrorHandler',
    '$state',
    'NotificationService',
    'ToolbarService',
    'TitleService',
    function ($scope,
              User,
              currentUser,
              ErrorHandler,
              $state,
              NotificationService,
              ToolbarService,
              TitleService) {

        if (currentUser.username){
            $state.go('app.stuff');
        }

        ToolbarService.set('Sign up', null, false, false);
        TitleService.set('Sign up');

        $scope.signup = function () {
            User.signup($scope.reg,
                function (res) {
                    $state.go('app.stuff',{},{reload: true})
                }, function (err) {
                    ErrorHandler.show(err);
                })
        };
    }
]);