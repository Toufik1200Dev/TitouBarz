import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  TextField,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Alert,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  ArrowBack,
  LocalShipping,
  Security,
  Support,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products';

export default function Cart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Mock cart data - in real app, this would come from context/state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      product: featuredProducts[0],
      quantity: 2,
    },
    {
      id: 2,
      product: featuredProducts[1],
      quantity: 1,
    },
  ]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 10000 ? 0 : 1500; // Free shipping over 10000 DA
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinueShopping}
            startIcon={<ArrowBack />}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  {/* Product Image */}
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.product.image}
                      alt={item.product.name}
                      sx={{ borderRadius: 1 }}
                    />
                  </Grid>

                  {/* Product Info */}
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.product.description}
                    </Typography>
                    {item.product.badge && (
                      <Chip
                        label={item.product.badge}
                        color="primary"
                        size="small"
                      />
                    )}
                  </Grid>

                  {/* Quantity Controls */}
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, value);
                        }}
                        sx={{ width: 60 }}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Price */}
                  <Grid item xs={12} sm={2}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {(parseFloat(item.product.price) * item.quantity).toFixed(2)} DA
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.product.price} DA each
                    </Typography>
                  </Grid>

                  {/* Remove Button */}
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                      sx={{ ml: 'auto' }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              {/* Summary Details */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">{calculateSubtotal().toFixed(2)} DA</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">
                    {calculateShipping() === 0 ? 'Free' : `${calculateShipping().toFixed(2)} DA`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Tax</Typography>
                  <Typography variant="body1">{calculateTax().toFixed(2)} DA</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {calculateTotal().toFixed(2)} DA
                  </Typography>
                </Box>
              </Box>

              {/* Free Shipping Alert */}
              {calculateSubtotal() < 10000 && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Add {(10000 - calculateSubtotal()).toFixed(2)} DA more for free shipping!
                </Alert>
              )}

              {/* Checkout Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                sx={{ mb: 2 }}
              >
                Proceed to Checkout
              </Button>

              {/* Features */}
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {[
                    { icon: <LocalShipping />, text: 'Free Shipping' },
                    { icon: <Security />, text: 'Secure Payment' },
                    { icon: <Support />, text: '24/7 Support' },
                  ].map((feature, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ color: 'primary.main', mb: 1 }}>{feature.icon}</Box>
                        <Typography variant="caption">{feature.text}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
