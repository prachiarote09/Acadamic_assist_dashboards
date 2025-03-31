const FeedbackModel = require("../Models/Feedback");

// Create a new event
const createFeedback = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); // Debugging output

        const {firstName, lastName, className, email, feedback  } = req.body;

        if (!firstName || !lastName|| !className || !email || !feedback) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newFeedback = new FeedbackModel({ firstName, lastName, className, email, feedback });
        await newFeedback.save();

        res.status(201).json({ message: "Feedback Added", success: true, data: newFeedback });
    } catch (error) {
        console.error("Error creating feedback:", error); // Log backend errors
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch all feedback
const fetchAllData = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch a single event by ID
const fetchSingleData = async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await FeedbackModel.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createFeedback,
    fetchAllData,
    fetchSingleData,
};
