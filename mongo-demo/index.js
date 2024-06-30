const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/playaround")
.then(() =>console.log("connected to Mongo DB successfully"))
.catch((err) =>console.error("could not connected to Mongo DB...", err));

const courseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	category: 
	{
		type: String,
		required: true,
		enum: ['web', 'network', 'mobile'],
		lowercase: true
	},
	author: String,
	tags: {
		type: Array,
		validate: {
			// isAsync: true,
			validator: function(v, callback){
				// setTimeout(() =>{
					const result = v && v.length>0;
					return result;
					// callback(result);
				// },4000);
			},
			message: "need to enter at least one tag"
		}
	},
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: { 
		type: Number, 
		min: 10,
		max: 200,
		required: function(){ return this.isPublished},
		get: v => Math.round(v),
		set: v => Math.round(v)
	}
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
	
	const course = new Course({
		name: 'Angular Course',
		category: "Web",
		author: 'Alex Chen',
		tags: ['fronted'],
		isPublished: true,
		price: 12.8
	});

	try{
		const result = await course.save();
		console.log(result);
	}
	catch(ex){
		for(field in ex.errors){
			console.log(ex.errors[field].message);
		}
		
	}
	
}

async function getCourses(){
	const pageNumber = 1;
	const pageSize = 10;

	const courses = await Course
	// .find({author: 'Alex Chen', isPublished: true})
	// .find({price: {$gt: 10, $lt: 20}})
	// .find({price: {$in: [10,15,20]}})
	// .find({author: /chen$/i})
	// .or([{author: 'Alex Chen'}, {isPublished: false}])
	.find({_id: '6441cc2efbe12cfd2931e260'})
	// .skip((pageNumber - 1) * pageSize)
	// .limit(pageSize)
	// .sort({name: 1})
	.select({ name: 1, tags: 1, price: 1});
	// .count();
	console.log(courses[0]);
}

async function updateCourse(id){
	// const course = await Course.findById(id);
	// if(!course) return;

	// course.author = 'Someone Else';
	// course.name = "New Course";

	// const result = await course.save();
	const result = await Course.findByIdAndUpdate(id, {
		$set: {
			author: "Alex 4",
			isPublished: true
		}
	}, {new: true});

	console.log(result);
}

async function removeCourse(id){
	// const course = await Course.deleteOne({_id: id});
	const course = await Course.findByIdAndRemove(id);
	console.log(course);
}

// removeCourse('64378923fb2de3799e0660ff');

getCourses();

// createCourse();