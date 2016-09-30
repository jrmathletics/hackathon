webApp = angular.module('WebApp', ['ngRoute', 'ui.bootstrap', 'chart.js']);

webApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/about', {
			templateUrl: '/static/scripts/views/about.html',
			controller: 'AboutController'
		}).
		otherwise({
			templateUrl: '/static/scripts/views/homepage.html',
			controller: 'HomepageController'
		});
}]);
