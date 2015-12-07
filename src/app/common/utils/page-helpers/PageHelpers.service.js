(function () {
	'use strict';

	angular
		.module('PageHelpers')
		.service('PageHelpers', PageHelpers);

	/* @ngInject */
	function PageHelpers(API, Site) {
		/*jshint validthis: true */

		var rootBlogPath = [
			API['root'],
			API['pages']['single'],
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
			var l = Site.collection.pages.length;
			var result;

			for(; i < l; i++) {
				if(Site.collection.pages[i].basename === routePath) {
					result = Site.collection.pages[i].path;
				}
			}

			return result;

		}
	}

})();
