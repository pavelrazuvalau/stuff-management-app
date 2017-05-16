angular.module('user').directive('usernameAvailable', function (User, ErrorHandler, $q) {
    return {
        // restrict to an attribute type.
        restrict: 'A',
        // element must have ng-model attribute.
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel){

            // add a parser that will process each time the value is
            // parsed into the model when the user updates it.
                ngModel.$asyncValidators.usernameTaken = function(modelValue, viewValue) {
                    var username = viewValue;
                    var deferred = $q.defer();

                    User.checkUsername({username: username},
                        function (res) {
                            if (res.isAvailable){
                                deferred.resolve();
                            }
                            else {
                                deferred.reject();
                            }
                        }, function (err) {
                            ErrorHandler.show(err);
                            deferred.reject();
                        });

                    return deferred.promise;
                }

        }
    }
});