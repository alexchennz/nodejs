
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');





router.get('/', async (req, res) => {
	throw new Error("Could not get the genre");
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, res) => {
	
	const genre = await Genre.findById(req.params.id);

	if(!genre){
		res.status(404).send("No movie with given id");
		return;
	}
	res.send(genre);
});

router.post('/', auth, async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	// //if no error, lets insert
	// const genre = {
	// 	id: genres.length + 1,
	// 	name: req.body.name
	// }
	// genres.push(genre);

	genre = new Genre({
		name: req.body.name
	});

	await genre.save();

	res.send(genre);

	
})

router.put('/:id', async (req, res) => {
	// const genre = genres.find(c => c.id === parseInt(req.params.id));
	// if(!genre){
	// 	res.status(404).send("No movie with given id");
	// 	return;
	// }

	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	// genre.name = req.body.name;

	const genre = await Genre.findByIdAndUpdate(req.params.id, req.body.name, { new: true});

	if(!genre){
		res.status(404).send("No movie with given id");
		return;
	}

	res.send(genre);

	
})

router.delete('/:id', [auth, admin], async (req, res) => {
	// const genre = genres.find(req.params.id);
	

	// const index = genres.indexOf(genre);
	// genres.splice(index, 1);

	const genre = await Genre.findByIdAndRemove(req.params.id);
	if(!genre){
		res.status(404).send("No movie with given id");
		return;
	}

	res.send(genre);
});




module.exports = router;