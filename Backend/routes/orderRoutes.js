const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Public routes
router.post('/', orderController.createOrder);

// Admin routes (these will be protected by admin middleware)
router.get('/', orderController.getAllOrders);
router.get('/stats', orderController.getOrderStats);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router; 