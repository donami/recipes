'use strict';

module.exports = function(app) {

	var categories = require('../../app/controllers/category.server.controller');

	app.route('/categories')
		.get(categories.list)
		.post(categories.create);

	app.route('/categories/:categoryId')
		.get(categories.read);

};