angular.module('ui').controller('uiCtrl', function ($scope, $mdSidenav) {
  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID).toggle()
    };
  }

  $scope.closeLeft = function(){
    $mdSidenav('left').close();
  }
})