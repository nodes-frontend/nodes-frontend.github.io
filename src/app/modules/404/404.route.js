(function() {
	'use strict';

	angular.module('notFound')
		/* @ngInject */
		.config(function ($stateProvider) {

			var notFound = {
				name: 'application.notFound',
				url: '/404',
				views: {
					'main@application': {
						templateUrl: 'app/modules/404/404.template.html',
						controller: 'NotFound',
						controllerAs: 'notFound'
					}
				}
			};

			$stateProvider.state(notFound);
		});
})();
