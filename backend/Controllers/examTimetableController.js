// controllers/examTimetableController.js
const mongoose = require('mongoose');

const ExamTimetable = require("../Models/ExamTimetable");

// @desc Create exam timetable
// @route POST /api/examtime
exports.createTimetable = async (req, res) => {
  try {
    const { text, pdf, img } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const newEntry = new ExamTimetable({ text, pdf, img });
    await newEntry.save();
    res.status(201).json({ message: "Timetable saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get all exam timetables
// @route GET /api/examtime
exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await ExamTimetable.find().sort({ createdAt: -1 });
    res.status(200).json(timetables);
  } catch (error) {
    console.error("Error fetching timetables:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Delete an exam timetable by ID
// @route DELETE /api/examtime/:id
// @desc Delete an exam timetable by ID
// @route DELETE /api/examtime/:id
exports.deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const timetable = await ExamTimetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({ error: "Timetable not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (error) {
    console.error("Error deleting timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

