(function() {
	'use strict';

	angular.module('api')
		.constant('API', {
			root: 'content/',
			blog: {
				list: '',
				single: 'blog/'
			},
			pages: {
				list: '',
				single: 'pages/'
			}
		});
})();