'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ingredients = require('../../app/controllers/ingredients.server.controller');

	// Ingredients Routes
	app.route('/ingredients')
		.get(ingredients.list)
		.post(users.requiresLogin, ingredients.create);

	app.route('/ingredients/:ingredientId')
		.get(ingredients.read)
		.put(users.requiresLogin, ingredients.hasAuthorization, ingredients.update)
		.delete(users.requiresLogin, ingredients.hasAuthorization, ingredients.delete);

	// Finish by binding the Ingredient middleware
	app.param('ingredientId', ingredients.ingredientByID);
};
