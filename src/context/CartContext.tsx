"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menuData";

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  isCartOpen: boolean;
  lastAddedDish: MenuItem | null;
  addToCart: (dish: MenuItem) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "calcutta_cafe_curated_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedDish, setLastAddedDish] = useState<MenuItem | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore localStorage errors
    }
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (dish: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });

    setLastAddedDish(dish);
  };

  const removeFromCart = (dishId: string) => {
    setItems((prev) => prev.filter((i) => i.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.dish.id === dishId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const dismissToast = () => setLastAddedDish(null);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        isCartOpen,
        lastAddedDish,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

