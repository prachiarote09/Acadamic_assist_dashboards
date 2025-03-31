const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Notice = require("../Models/Notice"); // Import Notice model
const { createNotice, fetchAllData, fetchSingleData } = require("../Controllers/NoticeController");

// Create a new notice
router.post("/", createNotice);

// Get all notices
router.get("/", fetchAllData);

// Get a single notice by ID
router.get("/:id", fetchSingleData);

// Delete a notice by ID
router.delete("/:id", async (req, res) => {
  try {
    const noticeId = req.params.id;
    console.log("Deleting notice with ID:", noticeId);

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(noticeId)) {
      return res.status(400).json({ message: "Invalid notice ID format" });
    }

    const notice = await Notice.findByIdAndDelete(noticeId);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    console.error("Error deleting notice:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
