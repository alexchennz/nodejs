const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genre');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 255
	}
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
	const schema = {
		title: Joi.string().min(5).required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required()
	}

	return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;