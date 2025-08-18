require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('🌥️ Testing Cloudinary Connection...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Not set');

// Test the connection by getting account info
async function testConnection() {
  try {
    console.log('\n🔗 Testing connection...');
    
    // Get account info to test connection
    const result = await cloudinary.api.ping();
    console.log('✅ Connection successful!');
    console.log('Response:', result);
    
    // Test upload capabilities
    console.log('\n📸 Testing upload capabilities...');
    const uploadResult = await cloudinary.uploader.upload(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VGVzdDwvdGV4dD48L3N2Zz4=',
      {
        folder: 'test',
        public_id: 'titoubarz-test-' + Date.now(),
        resource_type: 'auto'
      }
    );
    
    console.log('✅ Upload test successful!');
    console.log('Image URL:', uploadResult.secure_url);
    console.log('Public ID:', uploadResult.public_id);
    
    // Clean up test image
    await cloudinary.uploader.destroy(uploadResult.public_id);
    console.log('✅ Test image cleaned up');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.http_code) {
      console.error('HTTP Code:', error.http_code);
    }
  }
}

testConnection();
