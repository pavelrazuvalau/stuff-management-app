//Start by defining the main module and adding the module dependencies
angular.module(AppConfig.appModuleName, AppConfig.appModuleDependencies);

// Setting HTML5 Location Mode
angular.module(AppConfig.appModuleName)
	.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.hashPrefix('!');
		}
	])
	.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [AppConfig.appModuleName]);
});
