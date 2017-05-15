angular.module('stuff').controller('editStuffCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'TitleService',
    'ToolbarService',
    'NotificationService',
    'Stuff',
    'currentUser',
    'ErrorHandler',
    function ($scope,
              $state,
              $stateParams,
              TitleService,
              ToolbarService,
              NotificationService,
              Stuff,
              currentUser,
              ErrorHandler) {

            $scope.edit = $stateParams.default;
            TitleService.set($stateParams.default.name + ' - Edit');
            ToolbarService.set('Edit Stuff', null, null, 'app.stuff.details', {stuffId: $stateParams.default._id});
            $scope.types = ['T-shirt', 'Cup', 'Badge', 'Sticker', 'Сase'];
            $scope.editStuff = function () {
                Stuff.update({stuffId: $stateParams.default._id}, $scope.edit,
                    function (res) {
                        NotificationService.show('Successfully edited');
                        $state.go('^', {}, {reload: true})
                    },
                    function (err) {
                        ErrorHandler.show(err);
                    });
            }
    }
]);