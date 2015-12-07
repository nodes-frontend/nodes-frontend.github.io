(function () {
	'use strict';

	angular
		.module('Site')
		.service('Site', Site);

	/* @ngInject */
	function Site($q, $http, API) {
		/*jshint validthis: true */

		// Variables

		var service = {
			init: init,
			collection: {}
		};

		return service;

		function init() {

			var deferred = $q.defer();

			var url = [
				API['root'],
				'site-config.json'
			].join('');

			$http.get(url)
				.then(function getListSuccess(response) {
console.log(response.data.pages)
					if(response.data.pages) {
						service.collection.pages = response.data.pages;
					}
					if(response.data.blog) {
						service.collection.blog = response.data.blog;
					}
					console.log(service.collection)
					deferred.resolve(service.collection);
				})
				.catch(function getListError(err) {
					console.error(err);
					deferred.reject(err);
				});

			return deferred.promise;

		}

	}

})();
