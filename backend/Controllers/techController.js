const techCommittee = require('../Models/techdreamer');

// Get all committee members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await techCommittee.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new committee member
exports.addMember = async (req, res) => {
  try {
    const member = new techCommittee(req.body);
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update committee member
exports.updateMember = async (req, res) => {
  try {
    const member = await techCommittee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete committee member
exports.deleteMember = async (req, res) => {
  try {
    const member = await techCommittee.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 