(function () {
	'use strict';

	angular
		.module('application')
		.controller('Application', Application);

	/* @ngInject */
	function Application(Site, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.pages = [];

		vm.viewIsLoading = true;
		vm.hasBlog = false;

		activate();

		function activate() {

			if(Site.collection.blog.length > 0) {
				vm.hasBlog = true;
			}

			var siteWatcher = $scope.$watch(function() {
				return Site.collection.pages;
			}, function(list) {
				if(!angular.isDefined(list)) {
					return;
				}
				vm.pages = list;
				vm.viewIsLoading = false;
			});

		}
	}

})();
