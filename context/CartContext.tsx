import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  slug: string;
  title: string;
  variantTitle: string;
  variantId: string | number;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string | number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('coolo_cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('coolo_cart_v1', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.variantId === newItem.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (variantId: string | number) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return prevTotal(cart);
  };

  const prevTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};