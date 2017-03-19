angular.module('user').factory('User', ['$resource',
	function($resource) {
		return $resource('http://localhost:3000/', {

		});
	}
]);