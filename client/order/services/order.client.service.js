angular.module('order').factory('Order', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/order/:orderId/:action', {}, {
        pay: {
          method: 'GET',
            params: {action: 'pay'}
        },
        finish: {
            method: 'POST',
            params: {action: 'finish'}
        },
        cancel: {
            method: 'POST',
            params: {action: 'cancel'}
        }
    })
}]);

angular.module('order').factory('OrderAll', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/order/all', {});
}]);