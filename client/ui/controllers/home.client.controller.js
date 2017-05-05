angular.module('ui').controller('homeCtrl', ['$scope', 'ToolbarService', 'TitleService', function ($scope, ToolbarService, TitleService) {
    ToolbarService.setToolbar('Home', null, false);
    TitleService.set('Home');
}]);