'use strict';

// Recipes controller
angular.module('recipes').controller('RecipesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Recipes', 'Ingredients',
	function($scope, $stateParams, $location, Authentication, Recipes, Ingredients) {
		$scope.authentication = Authentication;

		// Fetch all the ingredients
		$scope.ingredients = Ingredients.query();

		// The added ingredients
		$scope.addedIngredients = [];

		// The selected ingredient
		$scope.selectedRecipe = {};

		// Format the added ingredients to be passed to server
		var formatIngredients = function() {
			var ingredients = [];

			angular.forEach($scope.addedIngredients, function(value, key) {
				ingredients.push({
					amount: value.amount,
					ingredient: value.recipe._id
				});
			});

			return ingredients;
		};

		/**
		 *	Add an ingredient to the recipe
		 **/
		$scope.addIngredient = function() {
			// Make sure that both fields are filled
			if (typeof $scope.selectedRecipe.recipe !== 'undefined' && typeof $scope.selectedRecipe.amount !== 'undefined') {
				$scope.addedIngredients.push($scope.selectedRecipe);

				delete $scope.selectedRecipe;
			}
		};

		/**
		 * Remove an ingredient from the added ingredients
		 **/ 
		$scope.removeIngredient = function(item) {
			$scope.addedIngredients.splice(item, 1);
		};


		// Create new Recipe
		$scope.create = function() {
			// Create new Recipe object
			var recipe = new Recipes ({
				name: this.name,
				description: this.description,
				//category: this.category,
				category: '5671fb6b407052af5e1b40d0',
				image: this.image,
				ingredients: formatIngredients()
			});

			// Redirect after save
			recipe.$save(function(response) {
				$location.path('recipes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Recipe
		$scope.remove = function(recipe) {
			if ( recipe ) { 
				recipe.$remove();

				for (var i in $scope.recipes) {
					if ($scope.recipes [i] === recipe) {
						$scope.recipes.splice(i, 1);
					}
				}
			} else {
				$scope.recipe.$remove(function() {
					$location.path('recipes');
				});
			}
		};

		// Update existing Recipe
		$scope.update = function() {
			var recipe = $scope.recipe;

			recipe.$update(function() {
				$location.path('recipes/' + recipe._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Recipes
		$scope.find = function() {
			$scope.recipes = Recipes.query();
		};

		// Find existing Recipe
		$scope.findOne = function() {
			$scope.recipe = Recipes.get({ 
				recipeId: $stateParams.recipeId
			});
		};
	}
]);