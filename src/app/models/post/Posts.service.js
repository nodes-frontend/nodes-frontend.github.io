(function () {
	'use strict';

	angular
		.module('Posts')
		.service('Posts', Posts);

	/* @ngInject */
	function Posts($q, $http, $sce, $state, API) {
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
				API['blog']['list'],
				'site-config.json'
			].join('');

			$http.get(url)
				.then(function getListSuccess(response) {

					var list = [];

					if(response.data.blog) {
						list = response.data.blog;
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
