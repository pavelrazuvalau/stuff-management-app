angular.module('user').directive('confirmPassword', function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=confirmPassword"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});