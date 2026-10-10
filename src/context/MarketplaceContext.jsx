import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MARKETPLACE_ITEMS } from '../data/seedData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

const MarketplaceContext = createContext();

export const MARKETPLACE_CATEGORIES = [
  'All',
  'Calculators',
  'Bicycles',
  'Study Lamps',
  'Books',
  'Electronics',
  'Hostel Essentials',
  'Others'
];

export const ITEM_CONDITIONS = ['All Conditions', 'Brand New', 'Like New', 'Good', 'Fair'];

export const MarketplaceProvider = ({ children }) => {
  const { showToast } = useToast();

  const [items, setItems] = useState(() => {
    return getStorageItem('hiet_marketplace_items', INITIAL_MARKETPLACE_ITEMS);
  });

  useEffect(() => {
    setStorageItem('hiet_marketplace_items', items);
  }, [items]);

  // Add new item from "Sell an Item" form
  const addItem = (itemData, user) => {
    const newItem = {
      id: 'item-' + Date.now(),
      title: itemData.title,
      description: itemData.description,
      price: Number(itemData.price),
      originalPrice: itemData.originalPrice ? Number(itemData.originalPrice) : Math.round(Number(itemData.price) * 1.5),
      category: itemData.category || 'Others',
      condition: itemData.condition || 'Good',
      image: itemData.image || 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80',
      sellerId: user?.id || 'guest_user',
      sellerName: user?.name || 'HIET Student',
      sellerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      sellerHostel: itemData.sellerHostel || user?.hostelBlock || 'Raman Hostel',
      sellerPhone: itemData.sellerPhone || user?.phone || '+91 98765 00000',
      sellerEmail: user?.email || 'student@hiet.org',
      createdAt: new Date().toISOString(),
      status: 'available',
      views: 1
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.title}" is now listed on campus mart!`, 'success');
    return newItem;
  };

  // Edit an existing item
  const editItem = (id, updatedFields) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Listing updated successfully!', 'success');
  };

  // Delete an item
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Listing removed from marketplace', 'info');
  };

  // Toggle Sold / Available status
  const toggleSoldStatus = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'sold' ? 'available' : 'sold';
          showToast(
            newStatus === 'sold' ? 'Item marked as Sold! Congrats on the campus deal.' : 'Item marked back as Available.',
            'success'
          );
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  // Increment view counter
  const incrementViews = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, views: (item.views || 0) + 1 } : item))
    );
  };

  // Get item by ID
  const getItemById = (id) => {
    return items.find((item) => item.id === id);
  };

  // Reset to seed data
  const resetMarketplace = () => {
    setItems(INITIAL_MARKETPLACE_ITEMS);
    setStorageItem('hiet_marketplace_items', INITIAL_MARKETPLACE_ITEMS);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        items,
        addItem,
        editItem,
        deleteItem,
        toggleSoldStatus,
        getItemById,
        incrementViews,
        resetMarketplace
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
