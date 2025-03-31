const Student = require("../Models/Student");

const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id; // Get student ID from the authenticated request

    const student = await Student.findById(studentId).select("-password"); // Exclude password

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getStudentProfile };
