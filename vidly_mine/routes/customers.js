const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
	const customer = await Customer.find().sort('name');

	res.send(customer);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if(!customer){
		res.status(404).send("No movie with given id");
		return;
	}
	res.send(customer);
});

router.post('/', async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone
	});

	customer = await customer.save();
	res.send(customer);
})

router.put('/:id', async (req, res) => {
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(req.params.id, req.body.name, { new: true});

	if(!customer){
		res.status(404).send("No Customer with given id");
		return;
	}

	res.send(customer);
})

router.delete('/:id', async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);
	if(!customer){
		res.status(404).send("No Customer with given id");
		return;
	}

	res.send(customer);
});

module.exports = router;