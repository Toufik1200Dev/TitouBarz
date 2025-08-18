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
  Chip,
  Rating,
  TextField,
  Tabs,
  Tab,
  Divider,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Share,
  Star,
  Add,
  Remove,
  LocalShipping,
  Security,
  Support,
  ArrowBack,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProducts } from '../data/products';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock product data - in real app, fetch from API
  const product = featuredProducts.find(p => p.id === parseInt(id)) || featuredProducts[0];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Order form state
  const [orderForm, setOrderForm] = useState({
    fullName: '',
    phoneNumber: '',
    wilaya: null,
    deliveryType: 'home',
    address: ''
  });
  
  // Calculate shipping and total
  const shippingCost = orderForm.wilaya && orderForm.deliveryType 
    ? (orderForm.deliveryType === 'home' ? orderForm.wilaya.homePrice : orderForm.wilaya.stopDeskPrice)
    : 0;
  
  const totalPrice = product ? (product.price + shippingCost) : 0;

  // Mock product images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent quality! This pull-up bar is exactly what I needed for my home gym.',
      avatar: 'JD',
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great product, easy to install. Would definitely recommend to others.',
      avatar: 'SM',
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      date: '2024-01-05',
      comment: 'Perfect for calisthenics training. Sturdy construction and good grip.',
      avatar: 'MR',
    },
  ];

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', { product, quantity });
    // TODO: Implement cart functionality
  };

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    console.log('Toggle wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show success message
    }
  };

  const handleOrderFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = () => {
    console.log('Place order:', { ...orderForm, product, totalPrice });
    // TODO: Implement order submission
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/shop')}
          sx={{ cursor: 'pointer' }}
        >
          Shop
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height={400}
              image={productImages[selectedImage]}
              alt={product.name}
              sx={{ borderRadius: 2, mb: 2 }}
            />
            {product.badge && (
              <Chip
                label={product.badge}
                color="primary"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                }}
              />
            )}
          </Box>
          
          {/* Thumbnail Images */}
          <Grid container spacing={1}>
            {productImages.map((image, index) => (
              <Grid item key={index}>
                <CardMedia
                  component="img"
                  height={80}
                  width={80}
                  image={image}
                  alt={`${product.name} ${index + 1}`}
                  sx={{
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid' : '2px solid transparent',
                    borderColor: 'primary.main',
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={averageRating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({reviews.length} reviews)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mr: 2 }}>
              {product.price} DA
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {product.originalPrice} DA
              </Typography>
            )}
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {/* Quantity Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              sx={{ width: 80, mx: 1 }}
              inputProps={{ min: 1, max: 10 }}
            />
            <IconButton onClick={() => handleQuantityChange(1)}>
              <Add />
            </IconButton>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              disabled={!product.inStock}
              onClick={handleAddToCart}
              sx={{ flex: 1 }}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <IconButton
              onClick={handleAddToWishlist}
              sx={{
                border: '1px solid',
                borderColor: isInWishlist ? 'primary.main' : 'divider',
                color: isInWishlist ? 'primary.main' : 'text.primary',
              }}
            >
              <Favorite />
            </IconButton>
            <IconButton
              onClick={handleShare}
              sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Share />
            </IconButton>
          </Box>

          {/* Order Form */}
          <Box sx={{ mb: 4, p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, background: 'rgba(0,0,0,0.02)' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
              Order Information / معلومات الطلب
            </Typography>
            
            {/* Product Info Section */}
            <Box sx={{ mb: 3, p: 2, background: 'rgba(0,0,0,0.03)', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Product Details / تفاصيل المنتج
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {product.price} DA
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Customer Information */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary-color)' }}>
                  Customer Information / معلومات العميل
                </Typography>
              </Box>
              
              {/* Full Name */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Full Name / الاسم الكامل"
                  variant="outlined"
                  size="small"
                  required
                  value={orderForm.fullName}
                  onChange={(e) => handleOrderFormChange('fullName', e.target.value)}
                  sx={{ 
                    width: '70%',
                    '& .MuiOutlinedInput-root': { borderRadius: 'var(--border-radius)' }
                  }}
                />
              </Box>
              
              {/* Phone Number */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Phone Number / رقم الهاتف"
                  variant="outlined"
                  size="small"
                  required
                  value={orderForm.phoneNumber}
                  onChange={(e) => handleOrderFormChange('phoneNumber', e.target.value)}
                  sx={{ 
                    width: '70%',
                    '& .MuiOutlinedInput-root': { borderRadius: 'var(--border-radius)' }
                  }}
                />
              </Box>
              
              {/* Wilaya */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormControl size="small" sx={{ width: '70%' }}>
                  <InputLabel>Wilaya / الولاية</InputLabel>
                  <Select
                    label="Wilaya / الولاية"
                    value={orderForm.wilaya}
                    onChange={(e) => handleOrderFormChange('wilaya', e.target.value)}
                    sx={{ 
                      borderRadius: 'var(--border-radius)',
                      '& .MuiSelect-select': {
                        fontSize: '14px',
                        padding: '12px 14px'
                      }
                    }}
                  >
                    {[
                      { code: 1, name: 'Adrar', arabic: 'أدرار', homePrice: 1150, stopDeskPrice: 600 },
                      { code: 2, name: 'Chlef', arabic: 'الشلف', homePrice: 700, stopDeskPrice: 450 },
                      { code: 3, name: 'Laghouat', arabic: 'الأغواط', homePrice: 900, stopDeskPrice: 550 },
                      { code: 4, name: 'Oum El Bouaghi', arabic: 'أم البواقي', homePrice: 700, stopDeskPrice: 450 },
                      { code: 5, name: 'Batna', arabic: 'باتنة', homePrice: 750, stopDeskPrice: 450 },
                      { code: 6, name: 'Béjaïa', arabic: 'بجاية', homePrice: 750, stopDeskPrice: 450 },
                      { code: 7, name: 'Biskra', arabic: 'بسكرة', homePrice: 870, stopDeskPrice: 550 },
                      { code: 8, name: 'Béchar', arabic: 'بشار', homePrice: 1110, stopDeskPrice: 550 },
                      { code: 9, name: 'Blida', arabic: 'البليدة', homePrice: 450, stopDeskPrice: 350 },
                      { code: 10, name: 'Bouira', arabic: 'البويرة', homePrice: 670, stopDeskPrice: 450 },
                      { code: 11, name: 'Tamanrasset', arabic: 'تمنراست', homePrice: 1550, stopDeskPrice: 900 },
                      { code: 12, name: 'Tébessa', arabic: 'تبسة', homePrice: 770, stopDeskPrice: 450 },
                      { code: 13, name: 'Tlemcen', arabic: 'تلمسان', homePrice: 750, stopDeskPrice: 450 },
                      { code: 14, name: 'Tiaret', arabic: 'تيارت', homePrice: 750, stopDeskPrice: 450 },
                      { code: 15, name: 'Tizi Ouzou', arabic: 'تيزي وزو', homePrice: 670, stopDeskPrice: 450 },
                      { code: 16, name: 'Alger', arabic: 'الجزائر', homePrice: 400, stopDeskPrice: 250 },
                      { code: 17, name: 'Djelfa', arabic: 'الجلفة', homePrice: 900, stopDeskPrice: 550 },
                      { code: 18, name: 'Jijel', arabic: 'جيجل', homePrice: 730, stopDeskPrice: 450 },
                      { code: 19, name: 'Sétif', arabic: 'سطيف', homePrice: 700, stopDeskPrice: 450 },
                      { code: 20, name: 'Saïda', arabic: 'سعيدة', homePrice: 770, stopDeskPrice: 450 },
                      { code: 21, name: 'Skikda', arabic: 'سكيكدة', homePrice: 700, stopDeskPrice: 450 },
                      { code: 22, name: 'Sidi Bel Abbès', arabic: 'سيدي بلعباس', homePrice: 750, stopDeskPrice: 450 },
                      { code: 23, name: 'Annaba', arabic: 'عنابة', homePrice: 730, stopDeskPrice: 450 },
                      { code: 24, name: 'Guelma', arabic: 'قالمة', homePrice: 750, stopDeskPrice: 450 },
                      { code: 25, name: 'Constantine', arabic: 'قسنطينة', homePrice: 700, stopDeskPrice: 450 },
                      { code: 26, name: 'Médéa', arabic: 'المدية', homePrice: 550, stopDeskPrice: 450 },
                      { code: 27, name: 'Mostaganem', arabic: 'مستغانم', homePrice: 750, stopDeskPrice: 450 },
                      { code: 28, name: 'M\'Sila', arabic: 'المسيلة', homePrice: 730, stopDeskPrice: 450 },
                      { code: 29, name: 'Mascara', arabic: 'معسكر', homePrice: 750, stopDeskPrice: 450 },
                      { code: 30, name: 'Ouargla', arabic: 'ورقلة', homePrice: 980, stopDeskPrice: 550 },
                      { code: 31, name: 'Oran', arabic: 'وهران', homePrice: 700, stopDeskPrice: 450 },
                      { code: 32, name: 'El Bayadh', arabic: 'البيض', homePrice: 1050, stopDeskPrice: 550 },
                      { code: 33, name: 'Illizi', arabic: 'إليزي', homePrice: 1550, stopDeskPrice: 850 },
                      { code: 34, name: 'Bordj Bou Arreridj', arabic: 'برج بوعريريج', homePrice: 700, stopDeskPrice: 450 },
                      { code: 35, name: 'Boumerdès', arabic: 'بومرداس', homePrice: 450, stopDeskPrice: 350 },
                      { code: 36, name: 'El Tarf', arabic: 'الطارف', homePrice: 770, stopDeskPrice: 450 },
                      { code: 37, name: 'Tindouf', arabic: 'تندوف', homePrice: 1350, stopDeskPrice: 600 },
                      { code: 38, name: 'Tissemsilt', arabic: 'تيسمسيلت', homePrice: 750, stopDeskPrice: 450 },
                      { code: 39, name: 'El Oued', arabic: 'الوادي', homePrice: 980, stopDeskPrice: 550 },
                      { code: 40, name: 'Khenchela', arabic: 'خنشلة', homePrice: 750, stopDeskPrice: 450 },
                      { code: 41, name: 'Souk Ahras', arabic: 'سوق أهراس', homePrice: 770, stopDeskPrice: 450 },
                      { code: 42, name: 'Tipaza', arabic: 'تيبازة', homePrice: 450, stopDeskPrice: 350 },
                      { code: 43, name: 'Mila', arabic: 'ميلة', homePrice: 750, stopDeskPrice: 450 },
                      { code: 44, name: 'Aïn Defla', arabic: 'عين الدفلى', homePrice: 700, stopDeskPrice: 450 },
                      { code: 45, name: 'Naâma', arabic: 'النعامة', homePrice: 980, stopDeskPrice: 550 },
                      { code: 46, name: 'Aïn Témouchent', arabic: 'عين تموشنت', homePrice: 750, stopDeskPrice: 450 },
                      { code: 47, name: 'Ghardaïa', arabic: 'غرداية', homePrice: 900, stopDeskPrice: 550 },
                      { code: 48, name: 'Relizane', arabic: 'غليزان', homePrice: 750, stopDeskPrice: 450 },
                      { code: 49, name: 'Timimoun', arabic: 'تيميمون', homePrice: 1150, stopDeskPrice: 600 },
                      { code: 51, name: 'Ouled Djellal', arabic: 'أولاد جلال', homePrice: 900, stopDeskPrice: 550 },
                      { code: 52, name: 'Beni Abbes', arabic: 'بني عباس', homePrice: 1100, stopDeskPrice: 550 },
                      { code: 53, name: 'In Salah', arabic: 'عين صالح', homePrice: 1450, stopDeskPrice: 850 },
                      { code: 55, name: 'Touggourt', arabic: 'تقرت', homePrice: 980, stopDeskPrice: 550 },
                      { code: 57, name: 'El M\'Ghair', arabic: 'المغير', homePrice: 980, stopDeskPrice: 800 },
                      { code: 58, name: 'El Meniaa', arabic: 'المنيعة', homePrice: 900, stopDeskPrice: 550 }
                    ].map((wilaya) => (
                      <MenuItem key={wilaya.code} value={wilaya}>
                        {wilaya.code} - {wilaya.name} / {wilaya.arabic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              {/* Delivery Type */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormControl size="small" sx={{ width: '70%' }}>
                  <InputLabel>Delivery Type / نوع التوصيل</InputLabel>
                  <Select
                    label="Delivery Type / نوع التوصيل"
                    value={orderForm.deliveryType}
                    onChange={(e) => handleOrderFormChange('deliveryType', e.target.value)}
                    sx={{ borderRadius: 'var(--border-radius)' }}
                  >
                    <MenuItem value="home">À domicile / توصيل منزلي</MenuItem>
                    <MenuItem value="stopDesk">Stop Desk / مكتب التوصيل</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              {/* Address */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                  label="Address / العنوان"
                  variant="outlined"
                  size="small"
                  required
                  multiline
                  rows={2}
                  value={orderForm.address}
                  onChange={(e) => handleOrderFormChange('address', e.target.value)}
                  sx={{ 
                    width: '70%',
                    '& .MuiOutlinedInput-root': { borderRadius: 'var(--border-radius)' }
                  }}
                />
              </Box>
            </Box>

            {/* Price Summary */}
            <Box sx={{ mt: 3, p: 2, background: 'rgba(0,0,0,0.03)', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary-color)' }}>
                Price Summary / ملخص السعر
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Product Price / سعر المنتج:</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{product.price} DA</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping Cost / تكلفة الشحن:</Typography>
                    <Typography sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      {shippingCost > 0 ? `${shippingCost} DA` : '-- DA'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total / المجموع:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      {totalPrice > 0 ? `${totalPrice} DA` : '-- DA'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    * Shipping cost will be calculated based on selected Wilaya and delivery type
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    * سيتم حساب تكلفة الشحن بناءً على الولاية المختارة ونوع التوصيل
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handlePlaceOrder}
                sx={{
                  background: 'var(--primary-gradient)',
                  '&:hover': { background: 'var(--secondary-gradient)' },
                  borderRadius: '50px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1.5
                }}
              >
                Place Order / تأكيد الطلب
              </Button>
            </Box>
          </Box>

          {/* Features */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={2}>
              {[
                { icon: <LocalShipping />, text: 'Free Shipping' },
                { icon: <Security />, text: 'Secure Payment' },
                { icon: <Support />, text: '24/7 Support' },
              ].map((feature, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>{feature.icon}</Box>
                    <Typography variant="body2">{feature.text}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            This premium calisthenics equipment is designed for serious athletes who demand the best. 
            Made with high-quality materials and engineered for durability, it provides the perfect 
            foundation for your strength training journey.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {[
              { label: 'Material', value: 'High-grade steel' },
              { label: 'Weight Capacity', value: '300 lbs' },
              { label: 'Dimensions', value: '48" x 24" x 6"' },
              { label: 'Installation', value: 'Wall-mounted' },
              { label: 'Warranty', value: '2 years' },
            ].map((spec, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body1" color="text.secondary">
                    {spec.label}:
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {spec.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Reviews
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={averageRating} precision={0.1} readOnly />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {averageRating.toFixed(1)} out of 5
              </Typography>
            </Box>
          </Box>

          {reviews.map((review) => (
            <Box key={review.id} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2 }}>{review.avatar}</Avatar>
                <Box>
                  <Typography variant="subtitle1">{review.user}</Typography>
                  <Rating value={review.rating} size="small" readOnly />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ml: 7 }}>
                {review.comment}
              </Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </TabPanel>
      </Box>

      {/* Related Products */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {featuredProducts.slice(0, 4).map((relatedProduct) => (
            <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {relatedProduct.name}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {relatedProduct.price} DA
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
