angular.module('cart').factory('Cart', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/cart/:stuffId', {});
}]);