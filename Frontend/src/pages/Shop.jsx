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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Pagination,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Paper,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Visibility,
  FilterList,
  ExpandMore,
  Search,
  Clear,
  FitnessCenter,
} from '@mui/icons-material';
import { featuredProducts } from '../data/products';
import { productsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Shop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for filtering and sorting
  const [products, setProducts] = useState(featuredProducts);
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);

  // Categories will be dynamically loaded from products
  const [categories, setCategories] = useState([]);

  const normalizeProduct = (p) => {
    if (!p) return null;
    const images = Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []);
    const image = images[0] || p.image || '/placeholder.svg?height=300&width=300';
    return {
      id: p._id || p.id,
      name: p.name || '',
      price: String(p.price ?? ''),
      originalPrice: p.originalPrice ? String(p.originalPrice) : undefined,
      image,
      description: p.description || '',
      rating: p.rating ?? 4.8,
      reviews: p.reviews ?? '0+',
      inStock: p.inStock ?? (p.stockQuantity > 0),
      category: p.category || '',
      badge: p.isFeatured ? 'Featured' : p.badge,
    };
  };

  // Load products from API
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await productsAPI.getAllProducts();
        const list = res?.data?.products || res?.data || [];
        const normalized = list.map(normalizeProduct).filter(Boolean);
        if (mounted) {
          setProducts(normalized);
          // Extract unique categories from products
          const uniqueCategories = [...new Set(normalized.map(p => p.category).filter(Boolean))];
          setCategories(uniqueCategories);
          setFilteredProducts(normalized);
        }
      } catch (e) {
        // Fallback to existing featuredProducts already in state
        console.warn('Using fallback products. API load failed.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
    // TODO: Implement cart functionality
  };

  const handleAddToWishlist = (product) => {
    console.log('Add to wishlist:', product);
    // TODO: Implement wishlist functionality
  };

  const handleViewProduct = (product) => {
    console.log('View product:', product);
    navigate(`/product/${product.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange([0, 20000]);
    setSortBy('name');
  };

  const FilterSidebar = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 'var(--border-radius)',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.05)',
        height: 'fit-content',
        position: 'sticky',
        top: 20,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FitnessCenter sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Filters
        </Typography>
      </Box>
      
      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: searchTerm && (
              <IconButton onClick={() => setSearchTerm('')}>
                <Clear />
              </IconButton>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 'var(--border-radius)',
            },
          }}
        />
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              borderRadius: 'var(--border-radius)',
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: 'var(--primary-color)' }}>
          Price Range: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DA
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={20000}
          sx={{
            '& .MuiSlider-thumb': {
              background: 'var(--primary-gradient)',
              width: 20,
              height: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            },
            '& .MuiSlider-track': {
              background: 'var(--primary-gradient)',
              height: 6,
              borderRadius: 3
            },
            '& .MuiSlider-rail': {
              background: 'rgba(0,0,0,0.1)',
              height: 6,
              borderRadius: 3
            },
            '& .MuiSlider-valueLabel': {
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
      </Box>

      {/* Sort */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              borderRadius: 'var(--border-radius)',
            }}
          >
            <MenuItem value="name">Name A-Z</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Clear Filters */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={clearFilters}
          sx={{ 
            borderRadius: '50px',
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.5,
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Results Count */}
      <Box
        sx={{
          p: 2,
          borderRadius: 'var(--border-radius)',
          background: 'var(--light-color)',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '500' }}>
          {filteredProducts.length} products found
        </Typography>
      </Box>
    </Paper>
  );

  // Horizontal filter bar (desktop)
  const FilterBar = () => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 'var(--border-radius)',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ width: 260, flex: '0 0 auto' }}>
          <TextField
            fullWidth
            label="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: searchTerm && (
                <IconButton onClick={() => setSearchTerm('')}>
                  <Clear />
                </IconButton>
              ),
            }}
            size="small"
          />
        </Box>

        <Box sx={{ width: 200, flex: '0 0 auto' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 260, flex: '0 0 auto' }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: 'var(--primary-color)', fontWeight: 'bold' }}>
            Price: {priceRange[0]} - {priceRange[1]} DA
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, v) => setPriceRange(v)}
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            size="small"
            sx={{
              '& .MuiSlider-thumb': { 
                background: 'var(--primary-gradient)',
                width: 16,
                height: 16
              },
              '& .MuiSlider-track': { 
                background: 'var(--primary-gradient)',
                height: 4
              },
              '& .MuiSlider-rail': { 
                background: 'rgba(0,0,0,0.1)',
                height: 4
              }
            }}
          />
        </Box>

        <Box sx={{ width: 200, flex: '0 0 auto' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="name">Name A-Z</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: '0 0 auto' }}>
          <Button variant="outlined" onClick={clearFilters} size="small">
            Clear Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ py: 4, background: 'var(--light-color)', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="Shop"
            size="small"
            sx={{
              mb: 2,
              background: 'var(--primary-gradient)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Premium <span className="gradient-text">Calisthenics</span> Equipment
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our collection of high-quality training gear for serious athletes
          </Typography>
        </Box>

        {/* Filters */}
        {isMobile ? (
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setDrawerOpen(true)}
            sx={{ 
              mb: 3,
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
            }}
          >
            Filters
          </Button>
        ) : (
          <FilterBar />
        )}

        <Grid container spacing={4}>
          {/* Products Grid */}
          <Grid item xs={12} md={12}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FitnessCenter sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Loading products...
                </Typography>
              </Box>
            ) : currentProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FitnessCenter sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {products.length === 0 ? 'No products available yet' : 'No products found matching your criteria'}
                </Typography>
                {products.length > 0 && (
                  <Button
                    variant="contained"
                    onClick={clearFilters}
                    sx={{ 
                      borderRadius: '50px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 4,
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={product.id}>
                      <Card
                        className="hover-lift"
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 'var(--border-radius)',
                          overflow: 'hidden',
                          border: '1px solid rgba(0,0,0,0.05)',
                          background: 'white',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="250"
                            image={product.image}
                            alt={product.name}
                            sx={{ objectFit: 'cover' }}
                          />
                          {product.badge && (
                            <Chip
                              label={product.badge}
                              color="primary"
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                fontWeight: 'bold',
                                background: 'var(--accent-gradient)',
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              className="glass"
                              onClick={() => handleAddToWishlist(product)}
                            >
                              <Favorite fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              className="glass"
                              onClick={() => handleViewProduct(product)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                          <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {product.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Rating value={product.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                              ({product.reviews})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                              {parseFloat(product.price).toLocaleString()} DA
                            </Typography>
                            {product.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through', ml: 1 }}
                              >
                                {parseFloat(product.originalPrice).toLocaleString()} DA
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                            {product.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                              variant="contained"
                              startIcon={<ShoppingCart />}
                              disabled={!product.inStock}
                              onClick={() => handleAddToCart(product)}
                              sx={{
                                py: 1.5,
                                borderRadius: '50px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                background: 'var(--primary-gradient)',
                                '&:hover': {
                                  background: 'var(--secondary-gradient)',
                                },
                                flex: 1
                              }}
                            >
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => handleViewProduct(product)}
                              sx={{
                                py: 1.5,
                                borderRadius: '50px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderColor: 'var(--primary-color)',
                                color: 'var(--primary-color)',
                                '&:hover': {
                                  borderColor: 'var(--secondary-color)',
                                  color: 'var(--secondary-color)',
                                  background: 'rgba(0,0,0,0.02)'
                                },
                                minWidth: 'auto',
                                px: 2
                              }}
                            >
                              Details
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(e, page) => setCurrentPage(page)}
                      color="primary"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: '50%',
                          fontWeight: 'bold',
                        },
                        '& .Mui-selected': {
                          background: 'var(--primary-gradient)',
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>

          {/* No desktop sidebar; filters shown above in a horizontal bar */}
        </Grid>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            p: 3,
            background: 'white',
          },
        }}
      >
        <FilterSidebar />
      </Drawer>
    </Box>
  );
}
