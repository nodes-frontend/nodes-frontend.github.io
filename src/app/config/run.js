(function() {
	'use strict';

	function run(appConfig, $window) {

		console.info('Starting Application ', angular);

		_setRootUrl();

		function _setRootUrl() {

			var path = $window.location.pathname;

			path = path.slice(1);

			appConfig.setConfig('ROOT_URL', path);

		}

	}

	angular
		.module('nBlog')
		.run(run);
})();