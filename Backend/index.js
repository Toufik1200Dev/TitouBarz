const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Import middleware
const adminAuth = require('./middleware/adminAuth');

const app = express();

// Connect to MongoDB - Commented out for now to use sample data
// connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Add request logging middleware
app.use((req, res, next) => {
  console.log('📥 Incoming Request:', {
    method: req.method,
    url: req.url,
    origin: req.headers.origin,
    userAgent: req.headers['user-agent']
  });
  
  next();
});

// Add CORS middleware to allow frontend requests
app.use((req, res, next) => {
  // Allow requests from your frontend domain
  res.header('Access-Control-Allow-Origin', 'https://barz-o.web.app');
  
  // Allow specific HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Allow specific headers including adminpassword
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, adminpassword');
  
  // Allow credentials (cookies, authorization headers)
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to TitouBarz API',
    version: '1.0.0',
    status: 'running',
    note: 'Using sample data - database connection disabled'
  });
});

// Status route to check Cloudinary configuration
app.get('/api/status', (req, res) => {
  try {
    res.json({
      message: 'TitouBarz API Status',
      version: '1.0.0',
      status: 'running',
      cloudinary: {
        isProduction: process.env.NODE_ENV === 'production',
        hasCloudinaryConfig: !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET),
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
        apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
        apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
      },
      note: 'Using sample data - database connection disabled'
    });
  } catch (error) {
    console.error('Status endpoint error:', error);
    res.status(500).json({
      message: 'Status check failed',
      error: error.message
    });
  }
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/upload', uploadRoutes);

// Admin routes with password protection
app.use('/api/admin/orders', adminAuth, orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`📸 Images served from: http://localhost:${PORT}/uploads`);
  console.log(`📝 Note: Using sample data - database connection disabled`);
});

module.exports = app; 