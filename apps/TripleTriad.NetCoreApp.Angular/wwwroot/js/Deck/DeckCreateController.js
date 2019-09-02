'use strict';

function DeckCreateController($scope, $http, ttconfig) {
	$scope.name = '';
	$scope.maxCards = 5;

	$scope.save = function () {
		$http.post(ttconfig.baseUrl + 'api/decks', {
			name: $scope.name,
			maxCards: $scope.maxCards
		})
		.then(function (response) {
			console.log(response);
		},
		function () {
		});
	};
}