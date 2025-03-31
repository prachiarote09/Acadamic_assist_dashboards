const NoticeModel = require("../Models/Notice");

// Create a new notice
const createNotice = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); // Debugging output

        const { className, title, date } = req.body; // ✅ Renamed 'class' to 'className'

        if (!className || !date || !title) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const newNotice = new NoticeModel({ className, title, date });
        await newNotice.save();

        res.status(201).json({ message: "Notice Added", success: true, data: newNotice });
    } catch (error) {
        console.error("Error creating notice:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch all notices
const fetchAllData = async (req, res) => {
    try {
        const notices = await NoticeModel.find().sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Fetch a single notice by ID
const fetchSingleData = async (req, res) => {
    const { id } = req.params;
    try {
        const notice = await NoticeModel.findById(id);
        if (!notice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.json(notice);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createNotice, // ✅ Fixed incorrect function name
    fetchAllData,
    fetchSingleData,
};
