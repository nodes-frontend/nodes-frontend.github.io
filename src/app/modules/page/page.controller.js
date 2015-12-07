(function () {
	'use strict';

	angular
		.module('page')
		.controller('Page', Page);

	/* @ngInject */
	function Page(page) {
		/*jshint validthis: true */
		var vm = this;

		vm.content = page;
		console.log(page)

		activate();

		function activate() {

		}
	}

})();
