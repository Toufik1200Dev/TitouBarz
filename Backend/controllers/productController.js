const Product = require('../models/Product');
const cloudinaryService = require('../services/cloudinaryService');
const fs = require('fs');
const path = require('path');

// Sample products data for testing (when database is not available)
const sampleProducts = [
  {
    _id: '1',
    name: 'Pull-Up Bar',
    description: 'Professional pull-up bar for home gym',
    price: 89.99,
    category: 'Bars',
    featured: true,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    stock: 15,
    rating: 4.8,
    reviews: 127
  },
  {
    _id: '2',
    name: 'Resistance Bands Set',
    description: 'Complete set of resistance bands for strength training',
    price: 29.99,
    category: 'Bands',
    featured: true,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    stock: 25,
    rating: 4.6,
    reviews: 89
  },
  {
    _id: '3',
    name: 'Gymnastic Rings',
    description: 'Professional gymnastic rings for advanced training',
    price: 69.99,
    category: 'Rings',
    featured: false,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    stock: 8,
    rating: 4.9,
    reviews: 156
  }
];

// Get all products with filtering and pagination
exports.getAllProducts = async (req, res) => {
  try {
    // For now, return sample products instead of database query
    // This allows the frontend to work while we set up the database
    
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

    // Filter sample products
    let filteredProducts = [...sampleProducts];
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured === true);
    }
    
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter(p => {
        if (minPrice && p.price < parseFloat(minPrice)) return false;
        if (maxPrice && p.price > parseFloat(maxPrice)) return false;
        return true;
      });
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
      }
      if (sortBy === 'rating') {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      }
      // Default sort by name
      return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    });

    // Pagination
    const total = filteredProducts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      totalProducts: total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = sampleProducts.filter(p => p.featured);
    res.json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products', error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = sampleProducts.find(p => p._id === req.params.id);
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
    const products = sampleProducts.filter(p => p.category === category);
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
    const results = sampleProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
    
    res.json({ products: results });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

// Get product categories
exports.getProductCategories = async (req, res) => {
  try {
    const categories = [...new Set(sampleProducts.map(p => p.category))];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
}; 