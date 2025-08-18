import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Tooltip,
  Badge,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Search,
  FilterList,
  Clear,
  LocalShipping,
  Payment,
  Person,
  CalendarToday,
  AttachMoney,
  ShoppingCart,
} from '@mui/icons-material';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error'
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export default function Orders() {
  const { getAuthHeaders } = useAdminAuth();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/orders', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus, notes, trackingNumber) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          status: newStatus,
          notes,
          trackingNumber
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus, notes, trackingNumber }
            : order
        )
      );

      setSnackbar({
        open: true,
        message: 'Order updated successfully!',
        severity: 'success'
      });

      setEditDialogOpen(false);
      setSelectedOrder(null);
    } catch (err) {
      console.error('Error updating order:', err);
      setSnackbar({
        open: true,
        message: `Failed to update order: ${err.message}`,
        severity: 'error'
      });
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Remove from local state
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

      setSnackbar({
        open: true,
        message: 'Order deleted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting order:', err);
      setSnackbar({
        open: true,
        message: `Failed to delete order: ${err.message}`,
        severity: 'error'
      });
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading orders...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Orders Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage customer orders, update status, and track deliveries
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {orders.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </Box>
                <Badge badgeContent={orders.filter(o => o.status === 'pending').length} color="warning">
                  <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                    {orders.filter(o => o.status === 'delivered').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Delivered
                  </Typography>
                </Box>
                <LocalShipping sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                    {orders.filter(o => o.status === 'shipped').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Transit
                  </Typography>
                </Box>
                <LocalShipping sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(0)} DA
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search by customer name or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={clearFilters}
            startIcon={<Clear />}
            size="small"
          >
            Clear
          </Button>

          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredOrders.length} orders found
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    #{order._id.toString().slice(-8).toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {order.customer.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.customer.phone}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.customer.wilaya}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    {order.products.map((product, index) => (
                      <Typography key={index} variant="body2">
                        {product.name} x {product.quantity}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {order.totalAmount.toFixed(2)} DA
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[order.status]}
                    color={statusColors[order.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedOrder(order);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Status">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedOrder(order);
                          setEditDialogOpen(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No orders found matching your criteria
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedOrder.status}
                  label="Status"
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                fullWidth
                label="Tracking Number"
                value={selectedOrder.trackingNumber || ''}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, trackingNumber: e.target.value })}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={selectedOrder.notes || ''}
                onChange={(e) => setSelectedOrder({ ...selectedOrder, notes: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleStatusUpdate(
              selectedOrder._id,
              selectedOrder.status,
              selectedOrder.notes,
              selectedOrder.trackingNumber
            )}
          >
            Update Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Customer Information</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2"><strong>Name:</strong> {selectedOrder.customer.fullName}</Typography>
                    <Typography variant="body2"><strong>Phone:</strong> {selectedOrder.customer.phone}</Typography>
                    <Typography variant="body2"><strong>Wilaya:</strong> {selectedOrder.customer.wilaya}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {selectedOrder.customer.address}</Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Order Information</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2"><strong>Order ID:</strong> #{selectedOrder._id.toString().slice(-8).toUpperCase()}</Typography>
                    <Typography variant="body2"><strong>Status:</strong> 
                      <Chip 
                        label={statusLabels[selectedOrder.status]} 
                        color={statusColors[selectedOrder.status]} 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body2"><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</Typography>
                    <Typography variant="body2"><strong>Payment:</strong> {selectedOrder.paymentMethod}</Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Products</Typography>
                  {selectedOrder.products.map((product, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="body2">{product.name} x {product.quantity}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {(product.price * product.quantity).toFixed(2)} DA
                      </Typography>
                    </Box>
                  ))}
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                    <Typography variant="h6">Total Amount</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {selectedOrder.totalAmount.toFixed(2)} DA
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
