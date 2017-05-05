angular.module('ui').service('TitleService', function () {
    var title;
    var callback;

    this.setCB = function (cb) {
        callback = cb;
    };

    this.set = function (_title) {
        title = _title;
        callback();
    };

    this.get = function () {
        return title;
    }
});