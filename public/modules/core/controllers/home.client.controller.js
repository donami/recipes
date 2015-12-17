'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Recipes', '$http',
	function($scope, Authentication, Recipes, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		// The array of the recipes viewed
		$scope.recipes = [];

		$scope.days = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];

		// Number of recipes wanted
		var nrOfRecipes = 7;

		/** 
		 * Get random plans and att them to the array
		 **/
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

		/**
		 *	Swap the meal into another random meal
		 **/
		$scope.swapMeal = function(index) {
			$http.get('/recipes/random')
				.then(function(response) {
					$scope.recipes[index] = response.data;
				});	
		};

	}
]);

