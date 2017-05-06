angular.module('stuff').factory('Stuff',['$resource', function ($resource) {
    return $resource('http://localhost:3000/stuff/:stuffId', {});
}]);