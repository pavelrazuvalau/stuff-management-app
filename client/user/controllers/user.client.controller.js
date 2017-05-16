angular.module('user').controller('userCtrl', [
    '$scope',
    'User',
    'currentUser',
    'ErrorHandler',
    '$state',
    function($scope,
             User,
             currentUser,
             ErrorHandler,
             $state){

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
                function () {
                $state.go($state.current.name,{},{reload: true})
            }, function (err) {
                ErrorHandler.show(err);
            })
        };

        $scope.signout = function () {
            User.signout(function () {
                $state.go('app.stuff',{},{reload: true});
            }, function (err) {
                ErrorHandler.show(err);
            });
        }
    }
]);