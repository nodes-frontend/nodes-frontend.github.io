(function () {
	'use strict';

	angular
		.module('BlogHelpers')
		.service('BlogHelpers', BlogHelpers);

	/* @ngInject */
	function BlogHelpers(API, Site) {
		/*jshint validthis: true */

		var rootBlogPath = [
			API['root'],
			API['blog']['single'],
		].join('');

		return {
			pathToRoute: pathToRoute,
			pathFromBaseName: pathFromBaseName
		};

		function pathToRoute(path) {
			console.log(path, rootBlogPath)
			var sanitizedPath = path.replace(rootBlogPath, '');
			console.log(sanitizedPath)
		}

		function pathFromBaseName(routePath) {

			var i = 0;
			var l = Site.collection.blog.length;
			var result;

			for(; i < l; i++) {
				if(Site.collection.blog[i].basename === routePath) {
					result = Site.collection.blog[i].path;
				}
			}

			return result;

		}
	}

})();
