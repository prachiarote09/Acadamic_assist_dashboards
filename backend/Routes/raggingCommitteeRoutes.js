const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  addMember,
  updateMember,
  deleteMember
} = require('../Controllers/raggingCommitteeController');

// Get all committee members
router.get('/', getAllMembers);

// Add new committee member
router.post('/', addMember);

// Update committee member
router.put('/:id', updateMember);

// Delete committee member
router.delete('/:id', deleteMember);

module.exports = router; 