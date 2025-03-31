const express = require('express');
const router = express.Router();
const sportCommitteeController = require('../Controllers/sportCommitteeController');

// Get all committee members
router.get('/', sportCommitteeController.getAllMembers);

// Add new committee member
router.post('/', sportCommitteeController.addMember);

// Update committee member
router.put('/:id', sportCommitteeController.updateMember);

// Delete committee member
router.delete('/:id', sportCommitteeController.deleteMember);

module.exports = router; 