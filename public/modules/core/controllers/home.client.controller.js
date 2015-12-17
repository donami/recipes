'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Recipes', '$http',
	function($scope, Authentication, Recipes, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		// The array of the recipes viewed
		$scope.recipes = [];

		// Number of recipes wanted
		var nrOfRecipes = 4;

		$scope.getPlan = function() {
			// Reset the recipes
			$scope.recipes = [];

			var addRecipes = function(response) {
				$scope.recipes.push(response.data);
			};

			// Run a loop for each recipe needed and add it to the array
			for (var i = 0; i < nrOfRecipes; i++) {
				$http.get('/recipes/random').then(addRecipes);				
			}
		};

	}
]);