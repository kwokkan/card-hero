'use strict';

function DeckEditController($scope, $http, ttconfig) {
	$scope.id = 0;
	$scope.name = '';
	$scope.maxCards = 5;

	$scope.cards = [];
	$scope.ownedCards = [];

	$scope.load = function () {
		$http.get(ttconfig.baseUrl + 'api/decks/' + $scope.id, {
		})
		.then(function (response) {
			$scope.name = response.data.name;
			$scope.maxCards = response.data.maxCards;

			$scope.cards = response.data.cards;
			$scope.ownedCards = response.data.ownedCards;
		},
		function () {
		});
	};

	$scope.save = function () {
		$http.put(ttconfig.baseUrl + 'api/decks/' + $scope.id, {
		})
		.then(function (response) {
			console.log(response);
		},
		function () {
		});
	};
}