(function() {
	"use strict";
	angular
			.module('page')
			.controller('yoloCtrl', yoloCtrl);

	function yoloCtrl($scope) {
		console.log('I come from a controller, loaded lazily!');

		var vm = this;

		vm.demoBinding = {
			demo: true,
			time: new Date(),
			string: 'jep'
		};
	}
})();