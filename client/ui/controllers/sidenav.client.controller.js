angular.module('ui').controller('sidenavCtrl', ['$scope', 'currentUser', function ($scope, currentUser) {
    $scope.menu = [
        {
            name: 'stuff',
            action: '.stuff',
            icon: 'local_mall'
        }
    ];

    $scope.admin_menu = [];

    if (currentUser.username) {
        $scope.menu.push.apply($scope.menu, [
            {
                name: 'Cart',
                action: '.cart',
                icon: 'shopping_cart'
            }, {
                name: 'Wish list',
                action: '.wish',
                icon: 'favorite'
            }, {
                name: 'My orders',
                action: '.orders',
                icon: 'redeem'
            }])
    }

    if (currentUser.role === 'Admin'){
        $scope.admin_menu.push({
            name: 'User orders',
            action: '.orders',
            icon: 'credit_card'
        }, {
            name: 'User management',
            action: '.users',
            icon: 'pan_tool'
        });
    }

    if (currentUser.role === 'Moderator' || currentUser.role === 'Admin'){
        $scope.admin_menu.push({
            name: 'User comments',
            action: '.comments',
            icon: 'comment'
        });
    }

}]);