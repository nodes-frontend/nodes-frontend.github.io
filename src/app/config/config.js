(function () {
	'use strict';

	var core = angular.module('config', []);

	/* @ngInject */
	function configure() {

		//$locationProvider.html5Mode(true);
		//$urlRouterProvider.otherwise('/404');

		//$stateProvider
		//	.state('application.notfound', {
		//		url: '/404',
		//		views: {
		//			'application@': {
		//				templateUrl: '404.html'
		//			}
		//		}
		//	})
		//	.state('error', {
		//		url: '/503',
		//		views: {
		//			'application@': {
		//				templateUrl: '503.html'
		//			}
		//		}
		//	});

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