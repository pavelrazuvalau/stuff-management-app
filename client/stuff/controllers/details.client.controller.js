angular.module('stuff').controller('stuffDetailsCtrl', ['$scope', 'currentStuff', '$stateParams', '$log', 'NotificationService', 'ToolbarService', 'TitleService', 'currentUser', '$mdDialog', '$state', 'wishList', 'Wish', function ($scope, currentStuff, $stateParams, $log, NotificationService, ToolbarService, TitleService, currentUser, $mdDialog, $state, wishList, Wish) {
    $scope.item = currentStuff;

    ToolbarService.set($scope.item.name, null, null, 'app.stuff');
    TitleService.set($scope.item.name + ' - Details');

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
    };
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

    $log.log(wishList.stuff.findIndex(function (item) {
        return item._id === currentStuff._id;
    }));

    if (wishList.stuff.findIndex(function (item) {
            return item._id === currentStuff._id;
        }) > -1){
        $scope.wishButton = 'favorite';
        $scope.wishAction = function(){
            Wish.remove({wishId: currentStuff._id}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully deleted from wish list', 'right bottom');
            }, function (err) {
                var message = err.data ? err.data.message : 'Connection error';
                $log.error(message);
                NotificationService.show(message, 'right bottom');
            })
        };
        $scope.tooltip = 'Remove from wish list';
    }
    else {
        $scope.wishButton = 'favorite_border';
        $scope.wishAction = function(){
            Wish.save(currentStuff, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully added to wish list', 'right bottom');
            }, function (err) {
                var message = err.data ? err.data.message : 'Connection error';
                $log.error(message);
                NotificationService.show(message, 'right bottom');
            })
        };
        $scope.tooltip = 'Add to wish list';
    }
}]);