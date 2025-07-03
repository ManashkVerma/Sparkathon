export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: number;
  categoryName?: string;
  image?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
  createdAt: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  createdAt: string;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  stock: number;
  categoryName?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  name: string;
  image?: string;
  categoryName?: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  pagination?: Pagination;
} 