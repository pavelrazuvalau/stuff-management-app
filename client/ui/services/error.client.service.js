angular.module('ui').service('ErrorHandler', ['$log', 'NotificationService', function ($log, NotificationService) {
    this.show = function (err) {
        var message;
        if (err.data){
            if (err.data.message){
                message = err.data.message;
            }
            else message = err.statusText;
        }
        else message = 'Connection Error';
        $log.error(err);
        NotificationService.show(message);
    }
}]);