webApp.controller('AboutController', ['$scope', 'CollaborationFactory', function ($scope, CollaborationFactory) {
	$scope.items = ["Apple", "Orange", "Blueberry"];

	CollaborationFactory.getCategory('JavaScript').then(function (result) {
		console.log(result.data);
		$scope.category = result.data;
	})
}]);