const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification
} = require('../controllers/userController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

module.exports = router; 