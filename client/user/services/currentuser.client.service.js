angular.module('user').service('CurrentUser', function () {
    var current_user;

    this.set = function (user) {
        current_user = user;
    };

    this.get = function () {
        return current_user;
    }
});