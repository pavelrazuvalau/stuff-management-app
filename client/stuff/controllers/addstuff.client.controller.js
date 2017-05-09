angular.module('stuff').controller('addStuffCtrl', ['$scope', '$state', 'StuffUpload', 'currentUser', 'ToolbarService', 'TitleService', 'NotificationService', '$timeout', 'ErrorHandler', function ($scope, $state, StuffUpload, currentUser, ToolbarService, TitleService, NotificationService, $timeout, ErrorHandler) {
    if (currentUser.role !== 'Admin'){
        $state.go('app.stuff', {}, {reload: true});
    }
    else {
        ToolbarService.set('Add Stuff', null, false, 'app.stuff');
        TitleService.set('Add Stuff');
        $scope.types = ['T-shirt', 'Cup', 'Pillow', 'Badge', 'Sticker', 'Сase'];

        $scope.generateThumbnail = function (files) {
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(event) {
                $timeout(function() {
                    if (file.type.substr(0, 5) === 'image')
                        $scope.thumbnail = event.target.result;
                    else $scope.thumbnail = ''
                });
            };
        };

        $scope.addStuff = function () {
            StuffUpload.save($scope.add)
                .then(function (res) {
                    NotificationService.show('Successfully added', 'right bottom');
                    $timeout(function(){$state.go('app.stuff', {}, {reload: true})}, 1000);
                }, function (err) {
                    ErrorHandler.show(err);
                }, function (event) {
                    $scope.uploadProgress = Math.floor(event.loaded / event.total) * 100;
                });
        }
    }
}]);