'use strict';

function PlayerStatsController($scope, $uibModal, $http, ttconfig, data) {
	$scope.id = data.id;
	$scope.name = data.name;
	$scope.wins = 0;
	$scope.losses = 0;
	$scope.isLoading = false;

	$scope.cards = [];

	$scope.load = function () {
		$scope.isLoading = true;

		$http.get(ttconfig.baseUrl + 'api/players/' + $scope.id + '/stats', {
		})
		.then(function (response) {
			$scope.wins = response.data.wins;
			$scope.losses = response.data.losses;
			$scope.isLoading = false;
		},
		function (error) {
		});
	};
}