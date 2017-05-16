angular.module('order').controller('orderCtrl', [
    '$scope',
    '$state',
    'currentUser',
    'Order',
    'currentOrders',
    'NotificationService',
    'ErrorHandler',
    'ToolbarService',
    'TitleService',
    function ($scope,
              $state,
              currentUser,
              Order,
              currentOrders,
              NotificationService,
              ErrorHandler,
              ToolbarService,
              TitleService) {

            TitleService.set('My orders');
            ToolbarService.set('My orders', null, null, null);

            $scope.orders = currentOrders;

            $scope.pay = function (id) {
                Order.pay({orderId: id}, function () {
                    NotificationService.show('Payment successful');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    NotificationService.show('Payment unsuccessful');
                })
            }
    }
]);