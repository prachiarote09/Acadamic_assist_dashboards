const mongoose = require('mongoose');
const result = require("../Models/resultModel");

// @desc Create exam result
// @route POST /api/examtime
exports.createresult = async (req, res) => {
  try {
    const { text, pdf, img } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const newEntry = new result({ text, pdf, img });
    await newEntry.save();
    res.status(201).json({ message: "result saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get all exam results
// @route GET /api/examtime
exports.getAllresults = async (req, res) => {
  try {
    const results = await result.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Delete an exam result by ID
// @route DELETE /api/examtime/:id
// @desc Delete an exam result by ID
// @route DELETE /api/examtime/:id
exports.deleteresult = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const result = await result.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: "result not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "result deleted successfully" });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

