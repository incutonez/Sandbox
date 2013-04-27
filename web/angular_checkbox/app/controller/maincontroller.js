(function(ng) {
	var app = ng.module('Checkbox', []);
	window.app = app;
	app.controller('MainController', function($scope) {
		console.log('here');
		$scope.sources = ['blah'];
	});
})(angular);