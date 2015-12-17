'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Recipes',
	function($scope, Authentication, Recipes) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.getPlan = function() {
			$scope.recipes = Recipes.query();
		};

	}
]);