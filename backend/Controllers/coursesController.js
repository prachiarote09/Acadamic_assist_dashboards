// controllers/examTimetableController.js
const mongoose = require('mongoose');

const Course = require("../Models/courseModel");

// @desc Create exam timetable
// @route POST /api/examtime
exports.createCourse = async (req, res) => {
  try {
    const { text, pdf, img } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const newEntry = new Course({ text, pdf, img });
    await newEntry.save();
    res.status(201).json({ message: "Timetable saved successfully", data: newEntry });
  } catch (error) {
    console.error("Error creating timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get all exam timetables
// @route GET /api/examtime
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Delete an exam timetable by ID
// @route DELETE /api/examtime/:id
// @desc Delete an exam timetable by ID
// @route DELETE /api/examtime/:id
exports.deletecourse = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ error: "Timetable not found" });
    }

    // Successfully deleted
    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (error) {
    console.error("Error deleting timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

