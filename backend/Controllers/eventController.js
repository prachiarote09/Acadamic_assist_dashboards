const EventModel = require("../Models/Event");

// Create a new event
const createEvent = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); // Debugging output
        const { name, description, date } = req.body;

        if (!name || !date || !description) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newEvent = new EventModel({ name, description, date });
        await newEvent.save();

        res.status(201).json({ message: "Event Added", success: true, data: newEvent });
    } catch (error) {
        console.error("Error creating event:", error); // Log backend errors
        res.status(500).json({ success: false, error: error.message });
    }
};


// Fetch all events
const fetchAllData = async (req, res) => {
    try {
        const events = await EventModel.find().sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch a single event by ID
const fetchSingleData = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createEvent,
    fetchAllData,
    fetchSingleData,
};
