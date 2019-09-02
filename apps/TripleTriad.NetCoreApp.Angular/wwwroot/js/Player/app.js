'use strict';

(function () {
	var html = document.documentElement;

	var cardApp = angular
		.module('playerApp', ['ui.bootstrap'])
		.constant('ttconfig', {
			baseUrl: html.getAttribute('data-base-url')
		})
		.controller('PlayerDetailController', PlayerDetailController)
		.controller('PlayerStatsController', PlayerStatsController)
		.controller('PlayerSearchController', PlayerSearchController)
	;
})();