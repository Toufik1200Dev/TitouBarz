const Product = require('../models/Product');
const cloudinaryService = require('../services/cloudinaryService');
const fs = require('fs');
const path = require('path');

// Get all products with filtering and pagination
exports.getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      minPrice, 
      maxPrice, 
      search, 
      featured,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (featured === 'true') {
      filter.featured = true;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    if (sortBy === 'price') {
      sort.price = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'rating') {
      sort['rating.average'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ 
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true }).lean();
    res.json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products', error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    let images = [];
    
    if (req.files && req.files.length > 0) {
      if (process.env.NODE_ENV === 'production') {
        // Production: Upload to Cloudinary
        try {
          const cloudinaryResults = await cloudinaryService.uploadMultipleImages(req.files, 'products');
          images = cloudinaryResults.map(result => ({
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.size
          }));
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed:', cloudinaryError);
          return res.status(500).json({ 
            message: 'Failed to upload images to cloud storage',
            error: cloudinaryError.message 
          });
        }
      } else {
        // Development: Use local file paths
        images = req.files.map(file => ({
          url: `/uploads/${file.filename}`,
          publicId: null,
          width: null,
          height: null,
          format: file.mimetype,
          size: file.size
        }));
      }
    } else if (req.body.images) {
      // If images are passed as URLs in body
      const imageUrls = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
      images = imageUrls.map(url => ({
        url: url,
        publicId: null,
        width: null,
        height: null,
        format: null,
        size: null
      }));
    }

    // Create product data with images
    const productData = {
      ...req.body,
      images: images
    };

    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    let images = req.body.images || [];
    
    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      if (process.env.NODE_ENV === 'production') {
        // Production: Upload to Cloudinary
        try {
          const cloudinaryResults = await cloudinaryService.uploadMultipleImages(req.files, 'products');
          const newImages = cloudinaryResults.map(result => ({
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            format: result.format,
            size: result.size
          }));
          
          // Combine new images with existing ones
          images = [...images, ...newImages];
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed:', cloudinaryError);
          return res.status(500).json({ 
            message: 'Failed to upload new images to cloud storage',
            error: cloudinaryError.message 
          });
        }
      } else {
        // Development: Use local file paths
        const newImages = req.files.map(file => ({
          url: `/uploads/${file.filename}`,
          publicId: null,
          width: null,
          height: null,
          format: file.mimetype,
          size: file.size
        }));
        
        // Combine new images with existing ones
        images = [...images, ...newImages];
      }
    }
    
    // Update product data with images
    const updateData = {
      ...req.body,
      images: images
    };
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Clean up images
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        try {
          if (process.env.NODE_ENV === 'production' && image.publicId) {
            // Production: Delete from Cloudinary
            await cloudinaryService.deleteImage(image.publicId);
          } else if (!process.env.NODE_ENV === 'production' && image.url) {
            // Development: Delete local file
            const imagePath = path.join(__dirname, '..', image.url);
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
            }
          }
        } catch (cleanupError) {
          console.error('Error cleaning up image:', cleanupError);
          // Continue with deletion even if image cleanup fails
        }
      }
    }
    
    // Delete the product
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category }).lean();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ products: [] });
    }
    
    const searchLower = q.toLowerCase();
    const results = await Product.find({ $text: { $search: searchLower } }).lean();
    
    res.json({ products: results });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

// Get product categories
exports.getProductCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category').lean();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
}; 