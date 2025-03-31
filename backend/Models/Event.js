const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

// Optional: Virtual to format the date
EventSchema.virtual("formattedDate").get(function () {
  return this.date.toISOString().split("T")[0].split("-").reverse().join("-");
});

const EventModel = mongoose.model('event', EventSchema);
module.exports = EventModel;
