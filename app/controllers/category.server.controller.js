'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller');


var Category = mongoose.model('Category');


/**
 * Create a Category
 */
exports.create = function(req, res) {

};

/**
 * Show the current Category
 */
exports.read = function(req, res) {
	Category.findById(req.params.categoryId).exec(function(err, category) {
        if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else {
			if (!category) {
				return res.status(404).send({
					message: 'category not found'
				})
			}
			res.json(category);
		}
	});
};

/**
 * Update a Category
 */
exports.update = function(req, res) {

};

/**
 * Delete an Category
 */
exports.delete = function(req, res) {

};

/**
 * List of Categories
 */
exports.list = function(req, res) {
	Category.find().exec(function(err, category) {
		if (err)
			throw err;
		else
			res.jsonp(category);
	});
};
