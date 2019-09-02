'use strict';

function GameSearchController($scope, $http, $uibModal, ttconfig) {
	$scope.startTime = '';
	$scope.endTime = '';
	$scope.activeOnly = true;
	$scope.sort = '';
	$scope.sortDir = '';

	$scope.games = [];

	$scope.search = function ($event) {
		$http.get(ttconfig.baseUrl + 'api/games', {
			params: {
				startTime: $scope.startTime,
				endTime: $scope.endTime,
				activeOnly: $scope.activeOnly,
				sort: $scope.sort,
				sortDir: $scope.sortDir
			}
		})
		.then(function (response) {
			$scope.games = response.data.games;
		},
		function () {
		});
	};
}