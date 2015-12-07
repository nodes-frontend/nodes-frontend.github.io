(function () {
	'use strict';

	angular
		.module('blog')
		.controller('BlogSingle', BlogSingle);

	/* @ngInject */
	function BlogSingle(post) {
		/*jshint validthis: true */
		var vm = this;

		vm.post = post;

		activate();

		function activate() {

		}
	}

})();
