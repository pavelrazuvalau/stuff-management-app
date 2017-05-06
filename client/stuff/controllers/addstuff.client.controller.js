angular.module('stuff').controller('addStuffCtrl', ['$scope', '$state', '$log', 'Stuff', 'currentUser', 'ToolbarService', 'TitleService', 'NotificationService', function ($scope, $state, $log, Stuff, currentUser, ToolbarService, TitleService, NotificationService) {
    if (currentUser.role != 'Admin'){
        $state.go('app.stuff', {}, {reload: true});
    }
    else {
        ToolbarService.set('Add Stuff', null, false, 'app.stuff');
        TitleService.set('Add Stuff');
        $scope.types = ['Tshirt', 'Cup', 'Pillow', 'Badge', 'Sticker', 'Сase'];

        $scope.addStuff = function () {
            Stuff.save($scope.add,
                function (res) {
                    NotificationService.show('Success', 'right bottom');
                    $state.go('app.stuff', {}, {reload: true})
                },
                function (err) {
                    $log.error(err.data.message);
                    NotificationService.show(err.data.message, 'right bottom');
                });
        }
    }
}]);