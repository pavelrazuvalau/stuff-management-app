angular.module('ui').service('SearchService', function () {
    var query;
    var callback;

    this.setCB = function (cb) {
        callback = cb;
    };

    this.setQuery = function (_query) {
        query = _query;
        callback();
    };

    this.getQuery = function () {
        return query;
    }
});