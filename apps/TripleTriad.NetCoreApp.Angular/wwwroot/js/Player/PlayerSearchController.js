'use strict';

function PlayerSearchController($scope, $http, $uibModal, ttconfig) {
	$scope.name = '';
	$scope.sort = '';
	$scope.sortDir = '';

	$scope.players = [];

	$scope.search = function ($event) {
		$http.get(ttconfig.baseUrl + 'api/players', {
			params: {
				name: $scope.name,
				sort: $scope.sort,
				sortDir: $scope.sortDir
			}
		})
		.then(function (response) {
			$scope.players = response.data.players;
		},
		function () {
		});
	};

	$scope.view = function ($event, data) {
		$event.preventDefault();

		var modalInstance = $uibModal.open({
			templateUrl: 'PlayerDetailModal.html',
			controller: 'PlayerDetailController',
			resolve: {
				data: {
					id: data.id,
					name: data.name
				}
			}
		});
	};

	$scope.viewStats = function ($event, data) {
		$event.preventDefault();

		var modalInstance = $uibModal.open({
			templateUrl: 'PlayerStatsModal.html',
			controller: 'PlayerStatsController',
			resolve: {
				data: {
					id: data.id,
					name: data.name
				}
			}
		});
	};
}