(function() {
	'use strict';

	angular
		.module('nBlog', [
			'ui.router',
			'config',
			'api',
			'notFound',
			'PageHelpers',
			'BlogHelpers',
			'Site',
			'Posts',
			'Pages',
			'application',
			'index',
			'page',
			'blog',
		]
	);

})();