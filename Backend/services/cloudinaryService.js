const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class CloudinaryService {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.hasCloudinaryConfig = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
  }

  // Upload image to Cloudinary
  async uploadImage(file, folder = 'products') {
    try {
      // Check if Cloudinary is configured
      if (!this.hasCloudinaryConfig) {
        console.log('⚠️ Cloudinary not configured, using local fallback');
        // Return a mock response for development/testing
        return {
          url: 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Upload+Disabled',
          publicId: `mock-${Date.now()}`,
          width: 800,
          height: 600,
          format: 'jpg',
          size: 0
        };
      }

      // Handle both buffer and file object
      let buffer, mimetype;
      if (Buffer.isBuffer(file)) {
        buffer = file;
        mimetype = 'image/jpeg'; // Default mimetype
      } else if (file.buffer && file.mimetype) {
        buffer = file.buffer;
        mimetype = file.mimetype;
      } else {
        throw new Error('Invalid file format');
      }

      // Convert buffer to base64 for Cloudinary
      const base64Image = buffer.toString('base64');
      const dataURI = `data:${mimetype};base64,${base64Image}`;

      console.log('📤 Uploading to Cloudinary...', {
        folder,
        mimetype,
        size: buffer.length
      });

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: folder,
        public_id: `titoubarz-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
        resource_type: 'auto',
        transformation: [
          { quality: 'auto:good' }, // Optimize quality
          { fetch_format: 'auto' }  // Auto-format (WebP for modern browsers)
        ]
      });

      console.log('✅ Cloudinary upload successful:', result.secure_url);

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      };
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      
      // If Cloudinary fails, return a fallback
      if (this.hasCloudinaryConfig) {
        console.log('🔄 Falling back to placeholder image due to Cloudinary error');
        return {
          url: 'https://via.placeholder.com/800x600/ffcccc/cc0000?text=Upload+Failed',
          publicId: `error-${Date.now()}`,
          width: 800,
          height: 600,
          format: 'jpg',
          size: 0
        };
      }
      
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

  // Upload multiple images
  async uploadMultipleImages(files, folder = 'products') {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, folder));
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Multiple image upload error:', error);
      throw new Error('Failed to upload multiple images');
    }
  }

  // Delete image from Cloudinary
  async deleteImage(publicId) {
    try {
      if (!this.hasCloudinaryConfig) {
        console.log('⚠️ Cloudinary not configured, skipping deletion');
        return { result: 'ok' };
      }

      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Cloudinary deletion error:', error);
      throw new Error('Failed to delete image from Cloudinary');
    }
  }

  // Get optimized image URL with transformations
  getOptimizedUrl(publicId, options = {}) {
    try {
      if (!this.hasCloudinaryConfig) {
        return null; // Return null in development
      }

      const defaultOptions = {
        width: 800,
        height: 600,
        crop: 'fill',
        quality: 'auto:good',
        format: 'auto'
      };

      const finalOptions = { ...defaultOptions, ...options };
      
      return cloudinary.url(publicId, finalOptions);
    } catch (error) {
      console.error('Error generating optimized URL:', error);
      return null;
    }
  }

  // Get responsive image URLs for different screen sizes
  getResponsiveUrls(publicId) {
    try {
      if (!this.hasCloudinaryConfig) {
        return null;
      }

      return {
        small: cloudinary.url(publicId, { width: 400, height: 300, crop: 'fill', quality: 'auto:good' }),
        medium: cloudinary.url(publicId, { width: 800, height: 600, crop: 'fill', quality: 'auto:good' }),
        large: cloudinary.url(publicId, { width: 1200, height: 900, crop: 'fill', quality: 'auto:good' }),
        original: cloudinary.url(publicId, { quality: 'auto:best' })
      };
    } catch (error) {
      console.error('Error generating responsive URLs:', error);
      return null;
    }
  }

  // Extract public ID from Cloudinary URL
  extractPublicId(url) {
    try {
      if (!url || !url.includes('cloudinary.com')) {
        return null;
      }

      // Extract public ID from URL like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image.jpg
      const urlParts = url.split('/');
      const uploadIndex = urlParts.findIndex(part => part === 'upload');
      
      if (uploadIndex === -1 || uploadIndex + 2 >= urlParts.length) {
        return null;
      }

      // Skip version number and get the rest
      const publicIdParts = urlParts.slice(uploadIndex + 2);
      return publicIdParts.join('/').replace(/\.[^/.]+$/, ''); // Remove file extension
    } catch (error) {
      console.error('Error extracting public ID:', error);
      return null;
    }
  }

  // Get image info
  async getImageInfo(publicId) {
    try {
      if (!this.hasCloudinaryConfig) {
        return null;
      }

      const result = await cloudinary.api.resource(publicId);
      return {
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
        createdAt: result.created_at
      };
    } catch (error) {
      console.error('Error getting image info:', error);
      return null;
    }
  }

  // Check if Cloudinary is available
  isAvailable() {
    return this.hasCloudinaryConfig;
  }

  // Get configuration status
  getConfigStatus() {
    return {
      isProduction: this.isProduction,
      hasCloudinaryConfig: this.hasCloudinaryConfig,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
    };
  }
}

module.exports = new CloudinaryService();
