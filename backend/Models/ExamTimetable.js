const mongoose = require("mongoose");

const examTimetableSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Path `text` is required."],
  },
  pdf: {
    type: String,
    default: null,
  },
  img: {
    type: String,
    default: null,
  },
});

const ExamTimetable = mongoose.model("ExamTimetable", examTimetableSchema);

module.exports = ExamTimetable;
