(function () {
	'use strict';

	angular
		.module('blog')
		.controller('Blog', Blog);

	/* @ngInject */
	function Blog($scope, Site) {
		console.log('BLOG CONT')
		/*jshint validthis: true */
		var vm = this;

		vm.posts = [];

		vm.viewIsLoading = true;

		activate();

		function activate() {

			var siteWatcher = $scope.$watch(function() {
				return Site.collection.blog;
			}, function(list) {
				if(!angular.isDefined(list)) {
					return;
				}
				vm.posts = list;
				vm.viewIsLoading = false;
			});

		}
	}

})();
