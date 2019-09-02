'use strict';

function PlayerDetailController($scope, $uibModal, $http, ttconfig, data) {
	$scope.id = data.id;
	$scope.name = data.name;
	$scope.isLoading = false;

	$scope.cards = [];

	$scope.load = function () {
		$scope.isLoading = true;

		$http.get(ttconfig.baseUrl + 'api/players/' + $scope.id, {
		})
		.then(function (response) {
			//$scope.id = response.data.id;
			//$scope.name = response.data.name;
			$scope.cards = response.data.cardCollection;
			$scope.isLoading = false;
		},
		function (error) {
		});
	};
}