// controllers/questionbankController.js
const mongoose = require('mongoose');

const questionbank = require("../Models/QBankModel");

// @desc Create exam questionbank
// @route POST /api/examtime
exports.createquestionbank = async (req, res) => {
  try {
    const { text, pdf, img } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const newEntry = new questionbank({ text, pdf, img });
    await newEntry.save();
    res.status(201).json({ message: "questionbank saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating questionbank:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get all exam questionbanks
// @route GET /api/examtime
exports.getAllquestionbanks = async (req, res) => {
  try {
    const questionbanks = await questionbank.find().sort({ createdAt: -1 });
    res.status(200).json(questionbanks);
  } catch (error) {
    console.error("Error fetching questionbanks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Delete an exam questionbank by ID
// @route DELETE /api/examtime/:id
// @desc Delete an exam questionbank by ID
// @route DELETE /api/examtime/:id
exports.deletequestionbank = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const questionbank = await questionbank.findByIdAndDelete(id);

    if (!questionbank) {
      return res.status(404).json({ error: "questionbank not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "questionbank deleted successfully" });
  } catch (error) {
    console.error("Error deleting questionbank:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

