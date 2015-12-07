(function () {
	'use strict';

	angular
		.module('index')
		.controller('Index', Index);

	/* @ngInject */
	function Index($scope, Site) {
		/*jshint validthis: true */
		var vm = this;

		vm.posts = [];

		vm.viewIsLoading = true;

		activate();

		function activate() {



		}
	}

})();
