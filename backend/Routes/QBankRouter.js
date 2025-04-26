const express = require("express");
const multer = require("multer");
const Examquestionbank = require("../Models/QBankModel");
const router = express.Router();
const {deletequestionbank, getAllquestionbanks } = require("../Controllers/QBankController")

// Set up multer storage for PDF and Image files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route for uploading Exam questionbank
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

    // Create a new Examquestionbank entry
    const newquestionbank = new Examquestionbank({
      text,
      pdf: pdfBase64,
      img: imgBase64,
    });

    // Save the questionbank to the database
    await newquestionbank.save();

    res.status(201).json({ message: "questionbank uploaded successfully!", data: newquestionbank });
  } catch (err) {
    console.error("Error uploading questionbank:", err);
    res.status(500).json({ message: "Failed to upload questionbank. Please try again later." });
  }
});

router.get("/", getAllquestionbanks);
router.delete("/:id", deletequestionbank);

module.exports = router;
