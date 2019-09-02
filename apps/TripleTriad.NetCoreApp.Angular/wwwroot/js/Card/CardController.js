'use strict';

function CardController($scope, $http, ttconfig) {
	$scope.name = '';
	$scope.sort = '';
	$scope.sortDir = '';

	$scope.cards = [];

	$scope.search = function ($event) {
		$http.get(ttconfig.baseUrl + 'CardApi/Get', {
			params: {
				name: $scope.name,
				sort: $scope.sort,
				sortDir: $scope.sortDir
			}
		})
		.then(function (response) {
			$scope.cards = response.data;
		},
		function () {
		});
	};
}