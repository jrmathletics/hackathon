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
		console.log('chartClicked');
		$scope.showCategoryUsed = true;
	};

	$scope.chart2Clicked = function() {
		$scope.showJavascript = true;
	};

	CollaborationFactory.getCategory('JavaScript').then(function (result) {
		$scope.category = result.data;
	});
	
	CollaborationFactory.getLanguages().then(
		function (result) {
			$scope.languages = result.data;
			console.log($scope.languages);
		},
		function () {
			var languages = {"Python":10356,"Shell":5434,"JavaScript":2530654,"ASP":2074789,"C#":1410261,"CSS":696805,"HTML":363671,"XSLT":21945,"PHP":684040,"Smarty":4769,"TypeScript":12616,"Perl":7731,"Ruby":510,"CoffeeScript":22732};

			var labels = [];
			var data = [];

			for (var key in languages) {
				if (languages.hasOwnProperty(key)) {
					labels.push(key);
					data.push(languages[key]);
				}
			}

			$scope.languages = {
				labels: labels,
				data: data
			};
		}
	);
	
	//$scope.open();
}]);
