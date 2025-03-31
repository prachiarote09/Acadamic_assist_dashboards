const express = require('express');
const router = express.Router();
const culturalCommitteeController = require('../Controllers/culturalCommitteeController');

// Get all committee members
router.get('/', culturalCommitteeController.getAllMembers);

// Add new committee member
router.post('/', culturalCommitteeController.addMember);

// Update committee member
router.put('/:id', culturalCommitteeController.updateMember);

// Delete committee member
router.delete('/:id', culturalCommitteeController.deleteMember);

module.exports = router; 