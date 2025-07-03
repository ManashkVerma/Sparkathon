import axios from 'axios';
import { Cart } from '../types';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
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
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address?: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: {
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
  }) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

// Products API
export const productsApi = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string, page = 1, limit = 12) => {
    const response = await api.get(`/products/search/${query}`, {
      params: { page, limit },
    });
    return response.data;
  },

  getFeaturedProducts: async (limit = 8) => {
    const response = await api.get('/products/featured/list', {
      params: { limit },
    });
    return response.data;
  },

  getProductsByCategory: async (
    categoryId: number,
    page = 1,
    limit = 12,
    sortBy = 'createdAt',
    sortOrder = 'DESC'
  ) => {
    const response = await api.get(`/products/category/${categoryId}`, {
      params: { page, limit, sortBy, sortOrder },
    });
    return response.data;
  },
};

// Categories API
export const categoriesApi = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategory: async (id: number) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId: number, quantity: number) => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  },

  updateQuantity: async (cartItemId: number, quantity: number) => {
    const response = await api.put('/cart/update', { cartItemId, quantity });
    return response.data;
  },

  removeFromCart: async (cartItemId: number) => {
    const response = await api.delete(`/cart/remove/${cartItemId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};

// Orders API
export const ordersApi = {
  createOrder: async (orderData: {
    shippingAddress: string;
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getOrders: async (page = 1, limit = 10) => {
    const response = await api.get('/orders', { params: { page, limit } });
    return response.data;
  },

  getOrder: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: number, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default api; 