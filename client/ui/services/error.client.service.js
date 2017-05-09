angular.module('ui').service('ErrorHandler', ['$log', 'NotificationService', function ($log, NotificationService) {
    this.show = function (err) {
        var message = err.data ? err.data.message : 'Connection Error';
        $log.error(message);
        NotificationService.show(message, 'right bottom');
    }
}]);