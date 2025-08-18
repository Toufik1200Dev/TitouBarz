const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Premium Pull-up Bar',
    description: 'Professional-grade pull-up bar for serious calisthenics training. Made with high-quality steel and designed for durability.',
    price: 2500,
    originalPrice: 3000,
    images: ['/images/pullup-bar-1.jpg', '/images/pullup-bar-2.jpg'],
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
    price: 1800,
    images: ['/images/rings-1.jpg', '/images/rings-2.jpg'],
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
    price: 1200,
    images: ['/images/bands-1.jpg', '/images/bands-2.jpg'],
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
    price: 3200,
    images: ['/images/parallel-bars-1.jpg', '/images/parallel-bars-2.jpg'],
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
      count: 15
    },
    tags: ['parallel-bars', 'dips', 'calisthenics', 'freestanding'],
    featured: true
  },
  {
    name: 'Training Mat',
    description: 'High-density training mat for floor exercises, stretching, and yoga. Provides excellent cushioning and grip.',
    price: 800,
    images: ['/images/mat-1.jpg', '/images/mat-2.jpg'],
    category: 'accessories',
    inStock: true,
    stockQuantity: 75,
    specifications: {
      material: 'High-density foam',
      weightCapacity: 'N/A',
      dimensions: '72" x 24" x 0.5"',
      installation: 'No installation required',
      warranty: '1 year'
    },
    rating: {
      average: 4.5,
      count: 18
    },
    tags: ['mat', 'training', 'floor-exercises', 'yoga'],
    featured: false
  },
  {
    name: 'Weighted Vest',
    description: 'Adjustable weighted vest for progressive overload training. Perfect for push-ups, pull-ups, and running.',
    price: 2200,
    images: ['/images/vest-1.jpg', '/images/vest-2.jpg'],
    category: 'accessories',
    inStock: true,
    stockQuantity: 40,
    badge: 'sale',
    originalPrice: 2800,
    specifications: {
      material: 'Heavy-duty nylon',
      weightCapacity: 'Adjustable 10-50 lbs',
      dimensions: 'One size fits most',
      installation: 'No installation required',
      warranty: '1 year'
    },
    rating: {
      average: 4.4,
      count: 22
    },
    tags: ['weighted-vest', 'progressive-overload', 'strength', 'cardio'],
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/titoubarz');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Display inserted products
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.price} DA`);
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
