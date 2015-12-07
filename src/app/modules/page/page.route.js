(function() {
	'use strict';

	angular.module('page')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Page = {
				name: 'application.page',
				url: '/page/:path',
				views: {
					'main@application': {
						templateUrl: 'app/modules/page/page.template.html',
						controller: 'Page',
						controllerAs: 'page'
					}
				},
				resolve: {
					page: function($stateParams, Pages, PageHelpers) {

						var pagePath = $stateParams.filePath ?
								$stateParams.filePath :
								PageHelpers.pathFromBaseName($stateParams.path);

						return Pages.getSingle(pagePath);
					}
				}
			};

			$stateProvider.state(Page);
		});
})();
