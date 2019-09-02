'use strict';

function GamePlayController($scope, $http, ttconfig) {
	$scope.gameId = 0;
	$scope.cardCollectionId = 0;
	$scope.row = 0;
	$scope.column = 0;

	$scope.move = function () {
		$http.post(ttconfig.baseUrl + 'api/gameplay/move', {
			gameId: $scope.gameId,
			cardCollectionId: $scope.cardCollectionId,
			row: $scope.row,
			column: $scope.column
		})
		.then(function (response) {
			console.log(response);
		},
		function () {
		});
	};
}