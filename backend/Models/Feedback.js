const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  className: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },

});

const FeedbackModel = mongoose.model('feedback', FeedbackSchema);
module.exports = FeedbackModel;
