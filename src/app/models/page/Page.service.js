(function () {
	'use strict';

	angular
		.module('Pages')
		.service('Pages', Pages);

	/* @ngInject */
	function Pages($q, $http, $sce, $state, API) {
		/*jshint validthis: true */

		// Variables

		var service = {
			getList: getList,
			getSingle: getSingle,
			collection: undefined
		};

		return service;

		function getList() {

			var deferred = $q.defer();

			var url = [
				API['root'],
				API['pages']['list'],
				'site-config.json'
			].join('');

			$http.get(url)
				.then(function getListSuccess(response) {

					var list = [];

					if(response.data.pages) {
						list = response.data.pages;
					}

					service.collection = response.data;

					deferred.resolve(list);
				})
				.catch(function getListError(err) {
					console.error(err);
					deferred.reject(err);
				});

			return deferred.promise;

		}

		function getSingle(path) {

			var deferred = $q.defer();

			var url = path;

			$http.get(url)
				.then(function getListSuccess(response) {
					var trustedData = $sce.trustAsHtml(response.data);

					deferred.resolve(trustedData);
				})
				.catch(function getListError(err) {
					console.error(err);
					$state.go('application.notFound');
					deferred.reject(err);
				});

			return deferred.promise;

		}
	}

})();
