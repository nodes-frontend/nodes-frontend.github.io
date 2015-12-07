(function () {
	'use strict';

	angular
		.module('Pages')
		.factory('Page', Page);

	/* @ngInject */
	function Page() {
		/*jshint validthis: true */

		// Variables

		// instantiate initial object
		var Model = function(data) {

			//this.defaultValue = '';

			angular.extend(this, data);
		};

		/*
			Example public method.
			Don't forget to inject your dependencies.

			Model.prototype.save = function(data) {

				var self = this;

				return someService.save(data)
					.then(function(response) {
						angular.extend(self, response.data);

						return response;
					});

			};
		*/

		return Model;
	}

})();
