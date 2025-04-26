// controllers/examquestionController.js
const mongoose = require('mongoose');

const Question = require("../Models/Ouestion");

// @desc Create exam question
// @route POST /api/examtime
exports.createQuestion = async (req, res) => {
  try {
    const { text, pdf, img } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const newEntry = new Question({ text, pdf, img });
    await newEntry.save();
    res.status(201).json({ message: "question saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get all exam questions
// @route GET /api/examtime
exports.getAllQuestions = async (req, res) => {
  try {
    const question = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ error: "question not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

