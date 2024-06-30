const express = require('express');
const router = express.Router();

const courses = [
	{ id: 1, name: 'course 1'},
	{ id: 2, name: 'course 2'},
	{ id: 3, name: 'course 3'}	
];


router.get('/', (req, res) => {
	res.send(courses);
});

router.get('/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(course){
		res.send(course);
	}
	res.status(404).send("No matching course");
});

router.post('/', (req, res) => {

	const {error} = validateCourse(req.body);	
	if(error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});

router.put('/:id', (req, res) => {
	// check exist, if not return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course) return res.status(404).send("No matching course");


	const {error} = validateCourse(req.body);	
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	course.name = req.body.name;
	res.send(course);
})

router.delete('/:id', (req, res) => {
	// check exist, if not return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course) return res.status(404).send("No matching course");

	const index = courses.indexOf(course);
	courses.splice(index, 1);

	res.send(course);
});

function validateCourse(course){
	//validate input, if not return 400
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(course, schema);
}


module.exports = router;


