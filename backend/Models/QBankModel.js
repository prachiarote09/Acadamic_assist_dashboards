const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema({
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

const questionbank = mongoose.model("questionbank", questionBankSchema);

module.exports = questionbank;
