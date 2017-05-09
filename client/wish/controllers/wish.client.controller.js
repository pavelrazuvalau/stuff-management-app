angular.module('wish').controller('wishCtrl', ['$scope', '$state', 'Wish', 'wishList', 'NotificationService', 'ToolbarService', 'TitleService', 'currentUser', 'ErrorHandler', '$mdDialog', 'Cart', 'currentCart', function ($scope, $state, Wish, wishList, NotificationService, ToolbarService, TitleService, currentUser, ErrorHandler, $mdDialog, Cart, currentCart) {
    if (!currentUser.username){
        $state.go('app.stuff');
    }
    else {
        TitleService.set('Wish list - ' + wishList.stuff.length + ' items');
        ToolbarService.set('Wish list', null, null, null);
        $scope.wishlist = wishList.stuff;
        $scope.delete = function(id){
            Wish.remove({stuffId: id}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully deleted from wish list', 'right bottom');
            }, function (err) {
                ErrorHandler.show(err);
            })
        };
        $scope.getSum = function () {
            var sum = 0;
            for (var i = 0; i < $scope.wishlist.length; i++){
                sum += $scope.wishlist[i].cost;
            }
            return sum.toFixed(2);
        };
        var clear = function () {
            var confirm = $mdDialog.confirm()
                .title('Would you like to clear wish list?')
                .targetEvent(event)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                Wish.remove(function () {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('Successfully cleared wish list', 'right bottom');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            });
        };
        ToolbarService.setMenu([
            {
                name: 'Clear List',
                action: clear
            }
        ]);
        $scope.addToCart = function (wish) {
            if (currentCart.stuff.findIndex(function (item) {
                    return item._id === wish._id;
                }) > -1){
                NotificationService.show('You have already added this item to your cart', 'right bottom');
            }
            else {
                Cart.save(wish, function (res) {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('Successfully added to the cart', 'right bottom');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
        }
    }
}]);