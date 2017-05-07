angular.module('stuff').controller('stuffDetailsCtrl', ['$scope', 'Stuff', '$stateParams', '$log', 'NotificationService', 'ToolbarService', 'TitleService', 'currentUser', '$mdDialog', '$state', function ($scope, Stuff, $stateParams, $log, NotificationService, ToolbarService, TitleService, currentUser, $mdDialog, $state) {
    Stuff.get({stuffId: $stateParams.stuffId}, function (res) {
        $scope.item = res;
        ToolbarService.set($scope.item.name, null, null, 'app.stuff');
        TitleService.set($scope.item.name + ' - Details');
        if (currentUser.role === 'Admin'){
            ToolbarService.setMenu([
                {
                    name: 'Edit',
                    action: edit
                }, {
                    name: 'Delete',
                    action: remove
                }
            ])
        }
    }, function (err) {
        var message = err.data ? err.data.message : 'Connection error';
        $log.error(message);
        NotificationService.show(message, 'right bottom');
    });

    var edit = function () {
        $state.go('.edit', {default: $scope.item})
    };

    var remove = function (event) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this item?')
            .targetEvent(event)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            Stuff.delete({stuffId: $scope.item._id}, function () {
                $state.go('app.stuff', {}, {reload: true});
                NotificationService.show('Successfully deleted', 'right bottom');
            }, function () {
                var message = err.data ? err.data.message : 'Connection error';
                $log.error(message);
                NotificationService.show(message, 'right bottom');
            })
        });
    }
}]);