angular.module('stuff').service('StuffUpload', ['Upload', '$http', function (Upload, $http) {
    this.save = function (data) {
        return Upload.upload({
            url: 'http://localhost:3000/stuff',
            method: 'POST',
            data: data
        })
    }
}]);