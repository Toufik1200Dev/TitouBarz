const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  getContactStats,
  markAsRead
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes (protected)
router.get('/', getContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.patch('/:id/read', markAsRead);

module.exports = router; 