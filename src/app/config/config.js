(function () {
	'use strict';

	var core = angular.module('config', []);

	/* @ngInject */
	function configure($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		$urlRouterProvider.otherwise('/');

	}

	function config() {

		var config = {
			ROOT_URL: ''
		};

		return {
			getConfig: getConfig,
			setConfig: setConfig
		};

		function getConfig(key) {
			if(key) {
				return config[key];
			}

			return config;
		}

		function setConfig(key, value) {
			config[key] = value;
		}

	}

	core.config(configure);
	core.service('appConfig', config);

})();