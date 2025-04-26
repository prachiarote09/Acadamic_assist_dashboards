const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getAllCourses, deletecourse } = require("../Controllers/coursesController");
const Course = require("../Models/courseModel");

// Set up multer storage for PDF and Image files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for uploading Exam courses
router.post("/", upload.fields([{ name: "pdf", maxCount: 1 }, { name: "img", maxCount: 1 }]), async (req, res) => {
  try {
    const { text } = req.body;
    const { pdf, img } = req.files;

    // Validation: Ensure that 'text' is provided
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "The question text is required." });
    }

    // Check if the files are uploaded
    if (!pdf && !img) {
      return res.status(400).json({ message: "At least one file (PDF or Image) is required." });
    }

    // Process the files (convert to base64 strings)
    const pdfBase64 = pdf ? pdf[0].buffer.toString("base64") : null;
    const imgBase64 = img ? img[0].buffer.toString("base64") : null;

    // Create a new Examcourses entry
    const newCourse = new Course({
      text,
      pdf: pdfBase64,
      img: imgBase64,
    });

    // Save the courses to the database
    await newCourse.save();

    res.status(201).json({ message: "courses uploaded successfully!", data: newCourse });
  } catch (err) {
    console.error("Error uploading courses:", err);
    res.status(500).json({ message: "Failed to upload courses. Please try again later." });
  }
});

router.get("/", getAllCourses);
router.delete("/:id", deletecourse);

module.exports = router;
