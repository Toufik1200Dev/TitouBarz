const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../config/storage');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/categories', productController.getProductCategories);
router.get('/search', productController.searchProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

// Admin routes (these will be protected by admin middleware)
router.post('/', upload.array('images', 5), productController.createProduct); // Allow up to 5 images
router.put('/:id', upload.array('images', 5), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router; 