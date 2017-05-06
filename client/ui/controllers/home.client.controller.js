angular.module('ui').controller('homeCtrl', ['$scope', 'ToolbarService', 'TitleService', function ($scope, ToolbarService, TitleService) {
    ToolbarService.set('Home', null, false, false);
    TitleService.set('Home');
}]);