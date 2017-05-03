'use strict'

// Init the application configuration module for AngularJS application
var AppConfig = (function() {
	// Init module configuration options
	var appModuleName = 'MEAN';
	var appModuleDependencies = ['ngResource', 'ngMessages', 'ui.router'];

	// Add a new vertical module
	var moduleReg = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies);

		// Add the module to the AngularJS configuration file
		angular.module(appModuleName).requires.push(moduleName);
	};

	return {
		appModuleName: appModuleName,
		appModuleDependencies: appModuleDependencies,
		moduleReg: moduleReg
	};
})();