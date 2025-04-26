const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
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

const result = mongoose.model("result", resultSchema);

module.exports = result;
