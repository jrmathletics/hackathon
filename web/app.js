webApp = angular.module('WebApp', ['ngRoute', 'ui.bootstrap', 'chart.js']);

webApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/about', {
			templateUrl: '/views/about.html',
			controller: function(){}
		}).
		otherwise({
			templateUrl: '/views/homepage.html',
			controller: 'HomepageController'
		});
}]);
