angular.module('ui').controller('homeCtrl', ['$scope', 'ToolbarService', function ($scope, ToolbarService) {
    ToolbarService.setToolbar('Home', null, false);
}]);