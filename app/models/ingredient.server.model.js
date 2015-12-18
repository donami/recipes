'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ingredient Schema
 */
var IngredientSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ingredient name',
		trim: true
	},
	unit: {
		type: String,
		default: '',
		required: 'Please fill in unit',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ingredient', IngredientSchema);