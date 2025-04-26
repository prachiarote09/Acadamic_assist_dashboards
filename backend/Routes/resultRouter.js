const express = require("express");
const multer = require("multer");
const result = require("../Models/resultModel");
const router = express.Router();
const {deleteresult, getAllresults } = require("../Controllers/resultController")

// Set up multer storage for PDF and Image files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for uploading Exam result
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

    // Create a new Examresult entry
    const newresult = new result({
      text,
      pdf: pdfBase64,
      img: imgBase64,
    });

    // Save the result to the database
    await newresult.save();

    res.status(201).json({ message: "result uploaded successfully!", data: newresult });
  } catch (err) {
    console.error("Error uploading result:", err);
    res.status(500).json({ message: "Failed to upload result. Please try again later." });
  }
});

router.get("/", getAllresults);
router.delete("/:id", deleteresult);

module.exports = router;
