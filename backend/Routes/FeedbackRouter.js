const express = require("express");
const router = express.Router();
const { createFeedback, fetchAllData, fetchSingleData } = require("../Controllers/FeedbackController");

// Create a new feedback
router.post("/", createFeedback);

// Get all feedbacks
router.get("/feedbacks", fetchAllData);

// Get a single feedback by ID
router.get("/feedback/:id", fetchSingleData);

module.exports = router;
