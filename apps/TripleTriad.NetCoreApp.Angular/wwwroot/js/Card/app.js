'use strict';

(function () {
	var html = document.documentElement;

	var cardApp = angular
		.module('cardApp', [])
		.constant('ttconfig', {
			baseUrl: html.getAttribute('data-base-url')
		})
		.controller('CardController', CardController);
})();