import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  LocalShipping,
  Assessment,
  MoreVert,
  Add,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock data - in real app, fetch from API
  const [stats, setStats] = useState({
    totalRevenue: 125000,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 24,
    pendingOrders: 12,
    lowStockProducts: 3,
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 1,
      orderNumber: 'SB24120001',
      customer: 'John Doe',
      amount: 89.99,
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: 2,
      orderNumber: 'SB24120002',
      customer: 'Sarah Smith',
      amount: 149.99,
      status: 'confirmed',
      date: '2024-01-14',
    },
    {
      id: 3,
      orderNumber: 'SB24120003',
      customer: 'Mike Johnson',
      amount: 79.99,
      status: 'shipped',
      date: '2024-01-13',
    },
  ]);

  const [topProducts, setTopProducts] = useState([
    {
      id: 1,
      name: 'Professional Pull-Up Bar',
      sales: 45,
      revenue: 4049.55,
      stock: 12,
    },
    {
      id: 2,
      name: 'Parallel Bars Set',
      sales: 32,
      revenue: 4799.68,
      stock: 8,
    },
    {
      id: 3,
      name: 'Resistance Bands Kit',
      sales: 28,
      revenue: 1119.72,
      stock: 15,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': onClick ? {
          transform: 'translateY(-5px)',
          boxShadow: theme.shadows[8],
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="success"
            subtitle="+12% from last month"
            onClick={() => navigate('/admin/analytics')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingCart />}
            color="primary"
            subtitle="+8% from last month"
            onClick={() => navigate('/admin/orders')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<People />}
            color="info"
            subtitle="+15% from last month"
            onClick={() => navigate('/admin/customers')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Inventory />}
            color="warning"
            subtitle={`${stats.lowStockProducts} low stock`}
            onClick={() => navigate('/admin/products')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" component="h2">
                  Recent Orders
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/admin/orders')}
                >
                  View All
                </Button>
              </Box>
              <List>
                {recentOrders.map((order) => (
                  <ListItem
                    key={order.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: 'primary.light' }}>
                        <ShoppingCart />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.orderNumber}
                      secondary={`${order.customer} • $${order.amount} • ${order.date}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Top Products */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Add />}
                        onClick={() => navigate('/admin/products/new')}
                        sx={{ mb: 1 }}
                      >
                        Add Product
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Assessment />}
                        onClick={() => navigate('/admin/analytics')}
                        sx={{ mb: 1 }}
                      >
                        View Analytics
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LocalShipping />}
                        onClick={() => navigate('/admin/orders')}
                      >
                        Manage Orders
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<People />}
                        onClick={() => navigate('/admin/customers')}
                      >
                        View Customers
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Products */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Top Products
                  </Typography>
                  {topProducts.map((product, index) => (
                    <Box key={product.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${product.revenue.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          {product.sales} sales
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Stock: {product.stock}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(product.sales / 50) * 100}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
