'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Recipe name',
		trim: true
	},
	category: {
		type: Schema.ObjectId,
		ref: 'Category'
	},
	ingredients: [{
		amount: String,
		ingredient: {
			type: Schema.ObjectId,
			ref: 'Ingredient'
		}
	}],
	image: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

RecipeSchema.statics.random = function(callback) {
	this.count(function(err, count) {
		if (err) {
			return callback(err);
		}
		var rand = Math.floor(Math.random() * count);
		this.findOne().skip(rand).exec(callback);

	}.bind(this));
};

mongoose.model('Recipe', RecipeSchema);