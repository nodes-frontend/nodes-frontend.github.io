(function() {
	'use strict';

	angular.module('application')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Application = {
				name: 'application',
				abstract: true,
				views: {
					'application': {
						templateUrl: 'app/modules/application/application.template.html',
						controller: 'Application',
						controllerAs: 'application'
					}
				}
			};

			$stateProvider.state(Application);
		});
})();
