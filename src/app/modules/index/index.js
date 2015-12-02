(function() {

	angular.module('nBlog')
		.controller('demoCtrl', function($http, $sce, appConfig) {

			var vm = this;

			var url = [appConfig.getConfig('ROOT_URL'), 'content/blog/folder/first-post.html'].join('');

			$http.get(url)
				.then(function(response) {
					vm.content = $sce.trustAsHtml(response.data);
				})
				.catch(function(err) {
					console.error('fetch failed! ', err);
				});
		});

	angular.module('nBlog')
		.directive('demoDirective', directive);

		/* @ngInject */
		function directive($http) {

			var directive = {
				link: link,
				restrict: 'EA',
				templateUrl: 'app/modules/index/test.template.html'
			};

			return directive;

			function link() {
				console.log('directive is linked...');
			}

		}

})();