import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart } from '../types';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const fetchCart = async () => {
    if (!user || !token) {
      setCart({ items: [], subtotal: 0, totalItems: 0 });
      return;
    }

    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setCart(response);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user, token]);

  const addToCart = async (productId: number, quantity: number) => {
    if (!user || !token) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await cartApi.addToCart(productId, quantity);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (!user || !token) {
      throw new Error('Please login to update cart');
    }

    try {
      await cartApi.updateQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!user || !token) {
      throw new Error('Please login to remove items from cart');
    }

    try {
      await cartApi.removeFromCart(cartItemId);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user || !token) {
      throw new Error('Please login to clear cart');
    }

    try {
      await cartApi.clearCart();
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 