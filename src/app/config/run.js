(function() {
	'use strict';

	function run($rootScope, $state, Site) {
		console.info('Bootstrapping Angular v.:', angular.version.full);
		console.log()
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
			if(Object.keys(Site.collection).length < 1) {
				console.info('No Site Configuration found, fetching...');
				event.preventDefault();

				Site.init()
						.then(function() {
							$state.go(toState, toParams);
						});
			}
		})

	}

	angular
		.module('nBlog')
		.run(run);
})();