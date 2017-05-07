angular.module('stuff').controller('addStuffCtrl', ['$scope', '$state', '$log', 'Stuff', 'currentUser', 'ToolbarService', 'TitleService', 'NotificationService', function ($scope, $state, $log, Stuff, currentUser, ToolbarService, TitleService, NotificationService) {
    if (currentUser.role !== 'Admin'){
        $state.go('app.stuff', {}, {reload: true});
    }
    else {
        ToolbarService.set('Add Stuff', null, false, 'app.stuff');
        TitleService.set('Add Stuff');
        $scope.types = ['Tshirt', 'Cup', 'Pillow', 'Badge', 'Sticker', 'Сase'];

        $scope.addStuff = function () {
            Stuff.save($scope.add,
                function (res) {
                    NotificationService.show('Successfully added', 'right bottom');
                    $state.go('app.stuff', {}, {reload: true})
                },
                function (err) {
                    var message = err.data ? err.data.message : 'Connection error';
                    $log.error(message);
                    NotificationService.show(message, 'right bottom');
                });
        }
    }
}]);