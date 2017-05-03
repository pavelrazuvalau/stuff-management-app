angular.module('ui').controller('uiCtrl', ['$scope', '$mdSidenav', '$log', function ($scope, $mdSidenav, $log) {
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    };
  }

  $scope.closeLeft = function(){
    $mdSidenav('left').close();
  };
}]);
