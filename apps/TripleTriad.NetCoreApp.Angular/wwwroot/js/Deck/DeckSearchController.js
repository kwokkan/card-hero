'use strict';

function DeckSearchController($scope, $http, $uibModal, ttconfig) {
	$scope.name = '';
	$scope.sort = '';
	$scope.sortDir = '';

	$scope.decks = [];

	$scope.search = function ($event) {
		$http.get(ttconfig.baseUrl + 'api/decks', {
		})
		.then(function (response) {
			$scope.decks = response.data;
		},
		function () {
		});
	};

	$scope.create = function ($event) {
		$event.preventDefault();

		var modalInstance = $uibModal.open({
			templateUrl: 'CreateDeckModal.html',
			controller: 'DeckCreateController'
		});
	};
}