angular.module('cart').controller('cartCtrl', ['$scope', '$state', '$stateParams', '$mdDialog', 'Cart', 'currentCart', 'currentUser', 'TitleService', 'ToolbarService', 'NotificationService', function ($scope, $state, $stateParams, $mdDialog, Cart, currentCart ,currentUser, TitleService, ToolbarService, NotificationService) {
    if (!currentUser.username){
        $state.go('app.stuff');
    }
    else {
        TitleService.set('Cart - ' + currentCart.stuff.length + ' items');
        ToolbarService.set('Cart', null, null, null);
        $scope.cart = currentCart.stuff;
        $scope.sum = currentCart.sum.toFixed(2);
        $scope.delete = function(id){
            Cart.remove({stuffId: id}, function (res) {
                $state.go($state.current.name,{},{reload: true});
                NotificationService.show('Successfully deleted from the cart', 'right bottom');
            }, function (err) {
                ErrorHandler.show(err);
            })
        };
        var clear = function () {
            var confirm = $mdDialog.confirm()
                .title('Would you like to clear the cart?')
                .targetEvent(event)
                .ok('Delete')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function() {
                Cart.remove(function () {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('Successfully cleared the cart', 'right bottom');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            });
        };
        ToolbarService.setMenu([
            {
                name: 'Clear cart',
                action: clear
            }
        ]);
    }
}]);