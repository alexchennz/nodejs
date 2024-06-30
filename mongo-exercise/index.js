const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to mongo-exercises successfully'))
.catch((err) =>console.error("could not connected to Mongo DB...", err));

const courseSchema = new mongoose.Schema({
	author: String,
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	name: String,
	price: Number,
	tags: [ String ]
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
	const courses = await Course
						// .find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
						.find({isPublished: true})
						.or([{price: {$gte: 15}}, {name: /.*by.*/i}])
						.sort({price: -1})
						.select({name: 1, author: 1, price: 1});

	console.log(courses);
}


getCourses();