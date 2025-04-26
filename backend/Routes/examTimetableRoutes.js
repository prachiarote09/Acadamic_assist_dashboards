const express = require("express");
const multer = require("multer");
const ExamTimetable = require("../Models/ExamTimetable");
const router = express.Router();
const {deleteTimetable, getAllTimetables } = require("../Controllers/examTimetableController")

// Set up multer storage for PDF and Image files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for uploading Exam Timetable
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

    // Create a new ExamTimetable entry
    const newTimetable = new ExamTimetable({
      text,
      pdf: pdfBase64,
      img: imgBase64,
    });

    // Save the timetable to the database
    await newTimetable.save();

    res.status(201).json({ message: "Timetable uploaded successfully!", data: newTimetable });
  } catch (err) {
    console.error("Error uploading timetable:", err);
    res.status(500).json({ message: "Failed to upload timetable. Please try again later." });
  }
});

router.get("/", getAllTimetables);
router.delete("/:id", deleteTimetable);

module.exports = router;
