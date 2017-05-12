angular.module('order').factory('Order', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/order/:orderId/:action', {}, {
        pay: {
          method: 'GET',
            params: {action: 'pay'}
        },
        finish: {
            method: 'GET',
            params: {action: 'status/finish'}
        },
        cances: {
            method: 'GET',
            params: {action: 'status/cancel'}
        }
    })
}]);