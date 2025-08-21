const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Premium Pull-up Bar',
    description: 'Professional-grade pull-up bar for serious calisthenics training. Made with high-quality steel and designed for durability.',
    price: 89.99,
    originalPrice: 119.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    category: 'calisthenics',
    inStock: true,
    stockQuantity: 50,
    badge: 'featured',
    specifications: {
      material: 'High-grade steel',
      weightCapacity: '300 lbs',
      dimensions: '48" x 24" x 6"',
      installation: 'Wall-mounted',
      warranty: '2 years'
    },
    rating: {
      average: 4.8,
      count: 12
    },
    reviews: [
      {
        user: 'John D.',
        rating: 5,
        comment: 'Excellent quality! This pull-up bar is exactly what I needed for my home gym.',
        date: new Date('2024-01-15')
      }
    ],
    tags: ['pull-up', 'calisthenics', 'strength', 'home-gym'],
    featured: true
  },
  {
    name: 'Gymnastic Rings Set',
    description: 'Professional gymnastic rings for advanced calisthenics movements. Perfect for building strength and stability.',
    price: 69.99,
    originalPrice: 89.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    category: 'calisthenics',
    inStock: true,
    stockQuantity: 30,
    badge: 'new',
    specifications: {
      material: 'Wood and leather',
      weightCapacity: '400 lbs',
      dimensions: 'Adjustable height',
      installation: 'Ceiling mounted',
      warranty: '1 year'
    },
    rating: {
      average: 4.9,
      count: 8
    },
    tags: ['rings', 'gymnastics', 'strength', 'stability'],
    featured: true
  },
  {
    name: 'Resistance Bands Set',
    description: 'Complete set of resistance bands for progressive strength training. Includes 5 different resistance levels.',
    price: 29.99,
    originalPrice: 39.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    category: 'accessories',
    inStock: true,
    stockQuantity: 100,
    specifications: {
      material: 'Natural latex',
      weightCapacity: 'Various levels',
      dimensions: 'Different lengths',
      installation: 'No installation required',
      warranty: '6 months'
    },
    rating: {
      average: 4.6,
      count: 25
    },
    tags: ['resistance', 'bands', 'strength', 'portable'],
    featured: false
  },
  {
    name: 'Parallel Bars',
    description: 'Professional parallel bars for dips, L-sits, and other advanced calisthenics movements.',
    price: 199.99,
    originalPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    category: 'calisthenics',
    inStock: true,
    stockQuantity: 20,
    badge: 'best-seller',
    specifications: {
      material: 'Stainless steel',
      weightCapacity: '350 lbs',
      dimensions: '72" x 24" x 36"',
      installation: 'Freestanding',
      warranty: '3 years'
    },
    rating: {
      average: 4.7,
      count: 18
    },
    tags: ['parallel-bars', 'dips', 'calisthenics', 'strength'],
    featured: true
  },
  {
    name: 'Weighted Vest',
    description: 'Adjustable weighted vest for progressive overload training. Perfect for calisthenics and bodyweight exercises.',
    price: 79.99,
    originalPrice: 99.99,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
    category: 'accessories',
    inStock: true,
    stockQuantity: 40,
    badge: 'sale',
    specifications: {
      material: 'Heavy-duty nylon',
      weightCapacity: 'Adjustable 10-50 lbs',
      dimensions: 'One size fits most',
      installation: 'No installation required',
      warranty: '1 year'
    },
    rating: {
      average: 4.5,
      count: 32
    },
    tags: ['weighted-vest', 'progressive-overload', 'strength', 'calisthenics'],
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/titoubarz';
    
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');

    // Clear existing products
    console.log('🧹 Clearing existing products...');
    await Product.deleteMany({});
    console.log('✅ Existing products cleared!');

    // Insert new products
    console.log('🌱 Seeding products...');
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${products.length} products!`);

    // Display seeded products
    console.log('\n📋 Seeded Products:');
    products.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - $${product.price}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
