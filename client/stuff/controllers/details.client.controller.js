angular.module('stuff').controller('stuffDetailsCtrl', ['$scope', 'currentStuff', '$stateParams', 'ErrorHandler', 'NotificationService', 'ToolbarService', 'TitleService', 'currentUser', '$mdDialog', '$state', 'wishList', 'Wish', 'currentCart', 'Cart', function ($scope, currentStuff, $stateParams, ErrorHandler, NotificationService, ToolbarService, TitleService, currentUser, $mdDialog, $state, wishList, Wish, currentCart, Cart) {
    $scope.item = currentStuff;

    ToolbarService.set($scope.item.name, null, null, $stateParams.backAction || 'app.stuff');
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
            }, function (err) {
                ErrorHandler.show(err);
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

    if (wishList.stuff.findIndex(function (item) {
            return item._id === currentStuff._id;
        }) > -1){
        $scope.wishButton = 'favorite';
        $scope.wishAction = function(){
            Wish.remove({stuffId: currentStuff._id}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully deleted from wish list', 'right bottom');
            }, function (err) {
                ErrorHandler.show(err);
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
                ErrorHandler.show(err);
            })
        };
        $scope.tooltip = 'Add to wish list';
    }
    if (currentCart.stuff.findIndex(function (item) {
            return item.item._id === currentStuff._id;
        }) > -1){
        $scope.cartButton = 'remove_shopping_cart';
        $scope.cartStyle = 'md-warn';
        $scope.cartName = 'Remove from cart';
        $scope.cartAction = function(){
            var idx = currentCart.stuff.findIndex(function (item) {
                return item.item._id === currentStuff._id;
            });
            Cart.remove({stuffId: currentCart.stuff[idx]._id}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully deleted from the cart', 'right bottom');
            }, function (err) {
                ErrorHandler.show(err);
            })
        };
    }
    else {
        $scope.cartButton = 'add_shopping_cart';
        $scope.cartStyle = 'md-primary';
        $scope.cartName = 'Add to cart';
        $scope.cartAction = function(){
            Cart.save({item: currentStuff, count: $scope.count}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully added to the cart', 'right bottom');
            }, function (err) {
                ErrorHandler.show(err);
            })
        };
    }
    $scope.checkCount = function () {
        if ($scope.count > 20){
            $scope.count = 20;
        }
        if ($scope.count < 1){
            $scope.count = 1;
        }
    };

}]);