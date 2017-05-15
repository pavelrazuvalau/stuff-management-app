angular.module('order').controller('allOrdersCtrl', [
    '$scope',
    '$state',
    'Order',
    'orderList',
    'ErrorHandler',
    'NotificationService',
    'ToolbarService',
    'TitleService',
    'currentUser',
    function ($scope,
              $state,
              Order,
              orderList,
              ErrorHandler,
              NotificationService,
              ToolbarService,
              TitleService,
              currentUser) {
            ToolbarService.set('User orders', null, null, null);
            TitleService.set('User orders');
            $scope.orders = orderList;

            $scope.finish = function (id, comment) {
                console.log($scope.status_comment);
                Order.finish({orderId: id},{comment: comment}, function () {
                    NotificationService.show('Order has been finished');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    ErrorHandler.show(err);
                })
            };

            $scope.cancel = function (id, comment) {
                console.log($scope.status_comment);
                Order.cancel({orderId: id}, {comment: comment}, function () {
                    NotificationService.show('Order has been canceled');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    ErrorHandler.show(err);
                })
            };

            $scope.delete = function (id) {
                Order.delete({orderId: id}, function () {
                    NotificationService.show('Order has been deleted');
                    $state.go($state.current.name,{},{reload: true});
                }, function (err) {
                    ErrorHandler.show(err);
                })
            }
    }
]);