import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  logout: () => api.post('/users/logout'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  forgotPassword: (email) => api.post('/users/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/users/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/users/verify-email', { token }),
  resendVerification: (email) => api.post('/users/resend-verification', { email }),
};

// Products API
export const productsAPI = {
  // Get all products with filtering and pagination
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured products');
    return response.json();
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products/category/${category}?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params });
    const response = await fetch(`${API_BASE_URL}/products/search?${searchParams}`);
    if (!response.ok) throw new Error('Failed to search products');
    return response.json();
  },

  // Get product categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};

// Admin API (comprehensive admin functions)
export const adminAPI = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getRecentOrders: () => api.get('/admin/dashboard/recent-orders'),
  getTopProducts: () => api.get('/admin/dashboard/top-products'),
  
  // Products Management
  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  getAllProducts: (params) => api.get('/admin/products', { params }),
  
  // Orders Management
  getAllOrders: (params) => api.get('/admin/orders', { params }),
  getOrderById: (id) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/admin/orders/${id}/status`, { status }),
  updateOrderPayment: (id, paymentData) => api.patch(`/admin/orders/${id}/payment`, paymentData),
  
  // Customers Management
  getAllCustomers: (params) => api.get('/admin/customers', { params }),
  getCustomerById: (id) => api.get(`/admin/customers/${id}`),
  updateCustomer: (id, customerData) => api.put(`/admin/customers/${id}`, customerData),
  
  // Analytics
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
  getSalesReport: (params) => api.get('/admin/analytics/sales', { params }),
  getCustomerReport: (params) => api.get('/admin/analytics/customers', { params }),
};

// Orders API
export const ordersAPI = {
  // Create order
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get all orders (admin)
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Get order by ID (admin)
  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  // Update order status (admin)
  updateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  // Delete order (admin)
  deleteOrder: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return response.json();
  }
};

// Delivery API
export const deliveryAPI = {
  getWilayas: () => api.get('/delivery/wilayas'),
  getWilayaById: (id) => api.get(`/delivery/wilayas/${id}`),
  getCommunesByWilaya: (wilayaId) => api.get(`/delivery/wilayas/${wilayaId}/communes`),
  calculatePrice: (deliveryData) => api.post('/delivery/calculate', deliveryData),
  getZones: () => api.get('/delivery/zones'),
  searchWilayas: (query) => api.get('/delivery/search', { params: { q: query } }),
  getStats: () => api.get('/delivery/stats'),
};

// Contact API
export const contactAPI = {
  submit: (contactData) => api.post('/contact', contactData),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  update: (id, contactData) => api.put(`/contact/${id}`, contactData),
  delete: (id) => api.delete(`/contact/${id}`),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  getStats: () => api.get('/contact/stats'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      return { error: true, message };
    } else if (error.request) {
      // Request was made but no response received
      return { error: true, message: 'Network error. Please check your connection.' };
    } else {
      // Something else happened
      return { error: true, message: 'An unexpected error occurred.' };
    }
  },

  // Format order data for API
  formatOrderData: (cartItems, shippingInfo, paymentMethod) => {
    const items = cartItems.map(item => ({
      product: item.product.id,
      quantity: item.quantity,
      price: parseFloat(item.product.price),
      total: parseFloat(item.product.price) * item.quantity,
    }));

    const subtotal = items.reduce((total, item) => total + item.total, 0);
    const deliveryFee = subtotal > 100 ? 0 : 15;
    const total = subtotal + deliveryFee;

    return {
      items,
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        phone: shippingInfo.phone,
        street: shippingInfo.street,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
      },
      delivery: {
        wilaya: shippingInfo.wilaya,
        commune: shippingInfo.commune,
        deliveryPrice: deliveryFee,
        estimatedDays: 3,
      },
      payment: {
        method: paymentMethod,
        status: 'pending',
      },
      subtotal,
      deliveryFee,
      total,
      currency: 'DZD',
    };
  },

  // Format product data for API
  formatProductData: (productData) => {
    return {
      name: productData.name,
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : undefined,
      description: productData.description,
      category: productData.category,
      images: productData.images || [],
      stockQuantity: parseInt(productData.stockQuantity) || 0,
      inStock: productData.inStock !== undefined ? productData.inStock : true,
      isFeatured: productData.isFeatured || false,
      specifications: productData.specifications || {},
      tags: productData.tags || [],
    };
  },
};

export default api;

// Helper function to get admin authentication headers
function getAuthHeaders() {
  const adminPassword = localStorage.getItem('adminPassword');
  return adminPassword ? { 'adminPassword': adminPassword } : {};
}
