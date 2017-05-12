angular.module('cart').controller('cartCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$mdDialog',
    'Cart',
    'currentCart',
    'currentUser',
    'TitleService',
    'ToolbarService',
    'NotificationService',
    'Order',
    'ErrorHandler',
    function ($scope,
              $state,
              $stateParams,
              $mdDialog,
              Cart,
              currentCart,
              currentUser,
              TitleService,
              ToolbarService,
              NotificationService,
              Order,
              ErrorHandler) {

        if (!currentUser.username){
            $state.go('app.stuff');
        }
        else {
            TitleService.set('Cart - ' + currentCart.stuff.length + ' items');
            ToolbarService.set('Cart', null, null, null);
            $scope.cart = currentCart.stuff;
            $scope.sum = currentCart.sum;
            $scope.delete = function(item){
                Cart.remove({stuffId: item._id}, function (res) {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('Successfully deleted from cart', 'right bottom');
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

            if (currentCart.stuff.length){
                ToolbarService.setMenu([
                    {
                        name: 'Clear cart',
                        action: clear
                    }
                ]);
            }

            $scope.makeOrder = function () {
                Order.save({comment: $scope.comment}, function () {
                    $state.go($state.current.name,{},{reload: true});
                    NotificationService.show('Order has been submitted', 'right bottom');
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
        }
    }
]);