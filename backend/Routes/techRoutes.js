const express = require('express');
const router = express.Router();
const techCommitteeController = require('../Controllers/techController');

// Get all committee members
router.get('/', techCommitteeController.getAllMembers);

// Add new committee member
router.post('/', techCommitteeController.addMember);

// Update committee member
router.put('/:id', techCommitteeController.updateMember);

// Delete committee member
router.delete('/:id', techCommitteeController.deleteMember);

module.exports = router; 