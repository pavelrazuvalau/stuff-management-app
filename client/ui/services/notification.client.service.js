angular.module('ui').service('NotificationService',['$mdToast', function ($mdToast) {
    this.show = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position('right bottom')
                .hideDelay(3000)
        );
    }
}]);