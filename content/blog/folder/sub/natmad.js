(function() {
	"use strict";
	angular
			.module('blog')
			.controller('natmadCtrl', natmadCtrl);

	function natmadCtrl($scope) {
		console.log('I come from a controller, loaded lazily!');

		var vm = this;

		vm.demoBinding = {
			demo: true,
			time: new Date(),
			string: 'BLOG ER COOOOOL'
		};
	}
})();