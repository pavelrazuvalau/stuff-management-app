angular.module('ui').service('CheckboxService', function () {
    var list = [];

    this.set = function (_list) {
        list = _list;
    };

    this.get = function () {
        return list;
    }
});