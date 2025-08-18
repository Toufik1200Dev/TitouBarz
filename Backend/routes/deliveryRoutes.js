const express = require('express');
const router = express.Router();
const {
  getWilayas,
  getWilayaById,
  getCommunesByWilaya,
  calculateDeliveryPrice,
  getDeliveryZones,
  getDeliveryStats,
  searchWilayas
} = require('../controllers/deliveryController');

// Public routes
router.get('/wilayas', getWilayas);
router.get('/wilayas/:id', getWilayaById);
router.get('/wilayas/:id/communes', getCommunesByWilaya);
router.post('/calculate', calculateDeliveryPrice);
router.get('/zones', getDeliveryZones);
router.get('/search', searchWilayas);

// Admin routes (protected)
router.get('/stats', getDeliveryStats);

module.exports = router; 