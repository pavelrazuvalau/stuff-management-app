angular.module('ui').service('NotificationService',['$mdToast', function ($mdToast) {
    this.show = function(message, position) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position(position)
                .hideDelay(3000)
        );
    }
}]);