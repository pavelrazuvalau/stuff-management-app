angular.module('user').factory('User', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/user/:action/:username', {}, {
        signin: {
            method: 'POST',
            params: {action: 'signin'}
        },
        signout: {
            method: 'GET',
            params: {action: 'signout'}
        },
        signup: {
            method: 'POST',
            params: {action: 'signup'}
        },
        checkUsername: {
            method: 'GET',
            params: {action: 'check'}
        },
        getAll: {
            methot: 'GET',
            params: {action: 'all'},
            isArray: true
        }
    })

}]);

angular.module('user').factory('UserManager', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/user/:userId', {})
}]);