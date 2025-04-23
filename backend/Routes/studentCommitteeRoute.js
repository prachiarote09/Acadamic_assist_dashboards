const express = require('express');
const router = express.Router();
const studentCommitteeController = require('../Controllers/studentCommittee');

// Get all committee members
router.get('/', studentCommitteeController.getAllMembers);

// Add new committee member
router.post('/', studentCommitteeController.addMember);

// Update committee member
router.put('/:id', studentCommitteeController.updateMember);

// Delete committee member
router.delete('/:id', studentCommitteeController.deleteMember);

module.exports = router; 