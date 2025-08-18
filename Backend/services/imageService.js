const fs = require('fs');
const path = require('path');

class ImageService {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.uploadDir = path.join(__dirname, '../uploads');
  }

  // Get image URL based on environment
  getImageUrl(imagePath) {
    if (!imagePath) return null;
    
    if (this.isProduction) {
      // In production, return cloud storage URL
      // You'll need to implement this based on your cloud provider
      return this.getCloudImageUrl(imagePath);
    } else {
      // In development, return local server URL
      return `http://localhost:5000${imagePath}`;
    }
  }

  // Get cloud image URL (implement based on your provider)
  getCloudImageUrl(imagePath) {
    // Example for AWS S3
    if (process.env.AWS_S3_BUCKET) {
      return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com${imagePath}`;
    }
    
    // Example for Google Cloud Storage
    if (process.env.GOOGLE_CLOUD_BUCKET_NAME) {
      return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}${imagePath}`;
    }
    
    // Example for Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      // Cloudinary URLs are already complete, just return as is
      return imagePath;
    }
    
    // Fallback to local (shouldn't happen in production)
    return `http://localhost:5000${imagePath}`;
  }

  // Delete image file
  async deleteImage(imagePath) {
    if (!imagePath) return;
    
    try {
      if (!this.isProduction) {
        // Delete local file
        const fullPath = path.join(this.uploadDir, path.basename(imagePath));
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      } else {
        // Delete from cloud storage
        await this.deleteCloudImage(imagePath);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  // Delete from cloud storage (implement based on your provider)
  async deleteCloudImage(imagePath) {
    try {
      // Example for AWS S3
      if (process.env.AWS_S3_BUCKET) {
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION
        });
        
        const key = imagePath.replace(`https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`, '');
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key
        }).promise();
      }
      
      // Add other cloud providers here...
      
    } catch (error) {
      console.error('Error deleting cloud image:', error);
    }
  }

  // Validate image file
  validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }
    
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB.');
    }
    
    return true;
  }

  // Generate unique filename
  generateFilename(originalName) {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = path.extname(originalName);
    return `product-${timestamp}-${random}${ext}`;
  }
}

module.exports = new ImageService();
