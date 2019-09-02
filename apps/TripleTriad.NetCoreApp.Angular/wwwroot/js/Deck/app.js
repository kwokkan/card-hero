'use strict';

(function () {
	var html = document.documentElement;

	var cardApp = angular
		.module('deckApp', ['ui.bootstrap'])
		.constant('ttconfig', {
			baseUrl: html.getAttribute('data-base-url')
		})
		.controller('DeckCreateController', DeckCreateController)
		.controller('DeckEditController', DeckEditController)
		.controller('DeckSearchController', DeckSearchController)
	;
})();