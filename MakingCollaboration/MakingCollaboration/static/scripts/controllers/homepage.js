webApp.controller('HomepageController', ['$scope', '$modal', 'CollaborationFactory', function($scope, $modal, CollaborationFactory){
	$scope.items = ["Apple", "Orange", "Blueberry"];

	$scope.labels = [".NET", "Javascript", "CSS"];
  $scope.data = [300, 500, 100];

	$scope.open = function(){
		$modal.open({
			templateUrl: 'myModalContent.html',
			controller: ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

				$scope.items = items;
				$scope.selected = {
					item: $scope.items[0]
				};

				$scope.ok = function () {
					$modalInstance.close($scope.selected.item);
				};

				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
			}],
			size: 'sm',
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		}).result.then(function (selectedItem) {
			$scope.selected = {fruit: selectedItem}
		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	$scope.chartClicked = function() {
		CollaborationFactory.getCategory('JavaScript').then(function (result) {
			console.log(result.data);
			$scope.children = result.data.childrenData;
		})
	};

	//$scope.open();
}]);
