const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
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

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
