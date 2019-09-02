'use strict';

(function () {
	var html = document.documentElement;

	var app = angular
		.module('gameApp', ['angularMoment', 'ui.bootstrap'])
		.constant('ttconfig', {
			baseUrl: html.getAttribute('data-base-url')
		})
		.controller('GamePlayController', GamePlayController)
		.controller('GameSearchController', GameSearchController)
	;
})();