angular.module('ui').controller('titleCtrl', ['$scope', 'TitleService', function ($scope, TitleService) {

    var updatecb = function () {
        $scope.title = TitleService.get();
    };

    updatecb();

    TitleService.setCB(updatecb);
}]);