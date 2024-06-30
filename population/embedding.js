const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId){
  const course = await Course.update({_id: courseId}, {
      $unset: {
        'author': ''
      }
    });
  
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// updateCourse('6445c0c3ddbe9d37374b25aa');

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Alex' })
// ]);

// addAuthor('6445c74d77c0bf65be41db04', new Author({ name: 'Evian'}));

removeAuthor('6445c74d77c0bf65be41db04', '6445c9062af4e57231c8a72a');
