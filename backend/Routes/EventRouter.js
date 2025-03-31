const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Event = require("../Models/Event");
const { createEvent, fetchAllData, fetchSingleData } = require("../Controllers/eventController");

// Create a new event
router.post("/", createEvent);

// Get all events
router.get("/", fetchAllData);

// Get a single event by ID
router.get("/:id", fetchSingleData);

// Delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
