import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    return getStorageItem('hiet_cart_items', []);
  });

  const [pickupSlot, setPickupSlot] = useState(() => {
    return getStorageItem('hiet_pickup_slot', '');
  });

  useEffect(() => {
    setStorageItem('hiet_cart_items', cartItems);
  }, [cartItems]);

  useEffect(() => {
    setStorageItem('hiet_pickup_slot', pickupSlot);
  }, [pickupSlot]);

  // Add item or increment
  const addToCart = (item, instructions = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
          instructions: instructions || updated[existingIndex].instructions
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            shop: item.shop || 'canteen', // 'canteen' | 'stationery'
            vendorName: item.vendorName || (item.shop === 'stationery' ? 'Campus Stationery & Xerox' : 'HIET Central Canteen'),
            isVeg: item.isVeg,
            image: item.image,
            instructions: instructions || ''
          }
        ];
      }
    });
    showToast(`Added "${item.name}" to cart`, 'success');
  };

  // Update quantity (if goes to 0, remove)
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // Update item instructions
  const updateInstructions = (itemId, instructions) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, instructions } : item))
    );
  };

  // Remove single item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Clear specific shop items
  const clearShopCart = (shopType) => {
    setCartItems((prev) => prev.filter((item) => item.shop !== shopType));
  };

  // Grouped items by shop
  const canteenItems = useMemo(
    () => cartItems.filter((item) => item.shop === 'canteen'),
    [cartItems]
  );

  const stationeryItems = useMemo(
    () => cartItems.filter((item) => item.shop === 'stationery'),
    [cartItems]
  );

  const canteenSubtotal = useMemo(
    () => canteenItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [canteenItems]
  );

  const stationerySubtotal = useMemo(
    () => stationeryItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [stationeryItems]
  );

  const totalCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const totalAmount = canteenSubtotal + stationerySubtotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        canteenItems,
        stationeryItems,
        canteenSubtotal,
        stationerySubtotal,
        totalCount,
        totalAmount,
        pickupSlot,
        setPickupSlot,
        addToCart,
        updateQuantity,
        updateInstructions,
        removeFromCart,
        clearCart,
        clearShopCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
