angular.module('wish').factory('Wish', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/wish/:wishId', {});
}]);