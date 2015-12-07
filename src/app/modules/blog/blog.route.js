(function() {
	'use strict';

	angular.module('blog')
		/* @ngInject */
		.config(function ($stateProvider) {

			var Blog = {
				name: 'application.blog',
				url: '/blog',
				views: {
					'main@application': {
						templateUrl: 'app/modules/blog/blog.template.html',
						controller: 'Blog',
						controllerAs: 'blog'
					}
				}
			};

			var BlogSingle = {
				name: 'application.blog.single',
				url: '/:path',
				params: {
					filePath: ''
				},
				views: {
					'content': {
						templateUrl: 'app/modules/blog/single/blog-single.template.html',
						controller: 'BlogSingle',
						controllerAs: 'blogSingle'
					}
				},
				resolve: {
					post: function($stateParams, Posts, BlogHelpers) {

						var postPath = $stateParams.filePath ?
								$stateParams.filePath :
								BlogHelpers.pathFromBaseName($stateParams.path);

						return Posts.getSingle(postPath);
					}
				}
			};

			$stateProvider.state(Blog);
			$stateProvider.state(BlogSingle);
		});
})();
