import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  Rating,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  ArrowForward,
  LocalShipping,
  Security,
  Support,
  FitnessCenter,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { productsAPI } from '../services/api';
import HeroSlider from '../components/HeroSlider';

// Default featured products for when API is not available
const defaultFeaturedProducts = [
  {
    _id: 1,
    id: 1,
    name: 'Premium Pull-up Bar',
    description: 'Professional-grade pull-up bar for serious calisthenics training. Made with high-quality steel and designed for durability.',
    price: 2500,
    originalPrice: 3000,
    images: ['/images/pullup-bar.jpg'],
    category: 'calisthenics',
    inStock: true,
    badge: 'featured',
    rating: { average: 4.8, count: 12 }
  },
  {
    _id: 2,
    id: 2,
    name: 'Gymnastic Rings Set',
    description: 'Professional gymnastic rings for advanced calisthenics movements. Perfect for building strength and stability.',
    price: 1800,
    images: ['/images/gymnastic-rings.jpg'],
    category: 'calisthenics',
    inStock: true,
    badge: 'new',
    rating: { average: 4.9, count: 8 }
  },
  {
    _id: 3,
    id: 3,
    name: 'Resistance Bands Set',
    description: 'Complete set of resistance bands for progressive strength training. Includes 5 different resistance levels.',
    price: 1200,
    images: ['/images/resistance-bands.jpg'],
    category: 'accessories',
    inStock: true,
    rating: { average: 4.6, count: 25 }
  },
  {
    _id: 4,
    id: 4,
    name: 'Parallel Bars',
    description: 'Professional parallel bars for dips, L-sits, and other advanced calisthenics movements.',
    price: 3200,
    images: ['/images/parallel-bars.jpg'],
    category: 'calisthenics',
    inStock: true,
    badge: 'best-seller',
    rating: { average: 4.7, count: 15 }
  }
];



export default function Home() {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState(defaultFeaturedProducts);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productsAPI.getFeaturedProducts();
        // Ensure products have both _id and id for compatibility
        const productsWithIds = products.map(product => ({
          ...product,
          id: product._id || product.id
        }));
        setFeaturedProducts(productsWithIds);
      } catch {
        console.log('Using fallback products. API load failed.');
        // Keep using default products
        setError('API connection failed, showing default products');
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  const handleAddToWishlist = (product) => {
    console.log('Add to wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const features = [
    {
      icon: <LocalShipping />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over 5000 DA',
    },
    {
      icon: <Security />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Round the clock customer support',
    },
    {
      icon: <FitnessCenter />,
      title: 'Premium Quality',
      description: 'Top-grade calisthenics equipment',
    },
  ];

  return (
    <div>
      {/* Hero Section with HeroSlider */}
      <HeroSlider />

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 6,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #000 30%, #FFD700 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 3,
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                    borderColor: '#FFD700',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    color: '#FFD700', 
                    mb: 3, 
                    fontSize: '3.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #000 30%, #FFD700 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Products
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            onClick={() => navigate('/shop')}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 'bold',
              fontSize: '1.1rem',
              px: 3,
              py: 1.5,
              borderRadius: '25px',
              background: '#000',
              color: '#FFD700',
              '&:hover': {
                background: '#333',
                transform: 'translateX(5px)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            View All
          </Button>
        </Box>

        {error && (
          <Box sx={{ textAlign: 'center', mb: 4, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
            <Typography color="warning.dark">
              {error} - Showing default products
            </Typography>
          </Box>
        )}

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                    borderColor: '#FFD700',
                  },
                }}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={product.images[0] || '/placeholder-image.jpg'}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', flex: 1 }}>
                      {product.name}
                    </Typography>
                    {product.badge && (
                      <Chip
                        label={product.badge}
                        sx={{ 
                          textTransform: 'capitalize',
                          fontWeight: 'bold',
                          ml: 1,
                          background: '#FFD700',
                          color: '#000'
                        }}
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating?.average || 0} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating?.count || 0})
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {product.description.substring(0, 80)}...
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                      {product.price} DA
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {product.originalPrice} DA
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<ShoppingCart />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      sx={{ 
                        flex: 1, 
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        py: 1,
                        background: isInCart(product.id) ? '#666' : '#000',
                        color: '#FFD700',
                        '&:hover': {
                          background: isInCart(product.id) ? '#555' : '#333'
                        }
                      }}
                    >
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outlined"
                      size="medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                      sx={{ 
                        p: 1,
                        borderRadius: '50%',
                        minWidth: 48,
                        height: 48,
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        '&:hover': {
                          background: '#FFD700',
                          color: '#000'
                        }
                      }}
                    >
                      <Favorite />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #000 30%, #333 90%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.1) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255,215,0,0.1) 0%, transparent 50%)',
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              color: '#FFD700'
            }}
          >
            Ready to Transform Your Training?
          </Typography>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Join thousands of athletes who trust TitouBarz for their calisthenics journey
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/shop')}
            sx={{
              background: '#FFD700',
              color: '#000',
              '&:hover': { 
                background: '#FFED4E',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(255,215,0,0.3)'
              },
              px: 6,
              py: 2,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255,215,0,0.2)'
            }}
          >
            Start Shopping
          </Button>
        </Container>
      </Box>
    </div>
  );
}
