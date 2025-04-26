const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  text: { type: String, required: true },
  pdf: { type: String },
  img: { type: String },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
