(function() {
	'use strict';

	angular.module('index')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Index = {
				name: 'application.index',
				url: '/',
				views: {
					'main@application': {
						templateUrl: 'app/modules/index/index.template.html',
						controller: 'Index',
						controllerAs: 'index'
					}
				}
			};

			$stateProvider.state(Index);
		});
})();
