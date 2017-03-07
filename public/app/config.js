'use strict'

// Init the application configuration module for AngularJS application
var AppConfig = (function() {
	// Init module configuration options
	var appModuleName = 'MEAN';
	var appModuleDependencies = ['ngResource', 'ngMaterial', 'ngMessages', 'ngAnimate'];

	// Add a new vertical module
	var registerModule = function(moduleName) {
		// Create angular module
		angular.module(moduleName, []);

		// Add the module to the AngularJS configuration file
		angular.module(appModuleName).requires.push(moduleName);
	};

	return {
		appModuleName: appModuleName,
		appModuleDependencies: appModuleDependencies,
		registerModule: registerModule
	};
})();
