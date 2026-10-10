import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_ORDERS } from '../data/seedData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

const OrderContext = createContext();

export const ORDER_STATUSES = ['Placed', 'Preparing', 'Ready', 'Collected'];

export const OrderProvider = ({ children }) => {
  const { showToast } = useToast();

  const [orders, setOrders] = useState(() => {
    return getStorageItem('hiet_orders', INITIAL_ORDERS);
  });

  useEffect(() => {
    setStorageItem('hiet_orders', orders);
  }, [orders]);

  // Place a new order
  const placeOrder = ({ shopType, items, subtotal, pickupSlot, user }) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = shopType === 'canteen' ? 'CANT' : 'STAT';
    const tokenLetter = shopType === 'canteen' ? 'C' : 'S';
    const tokenNumber = `${tokenLetter}-${Math.floor(10 + Math.random() * 90)}`;
    const nowIso = new Date().toISOString();

    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber: `#HIET-${prefix}-${randomSuffix}`,
      shopType, // 'canteen' | 'stationery'
      shopName: shopType === 'canteen' ? 'HIET Central Canteen' : 'Campus Stationery & Xerox',
      studentId: user?.id || 'guest_user',
      studentName: user?.name || 'HIET Student',
      studentEmail: user?.email || 'student@hiet.org',
      studentHostel: user?.hostelBlock || 'Hostel Campus',
      studentPhone: user?.phone || '+91 98765 43210',
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        instructions: i.instructions || ''
      })),
      subtotal,
      tax: 0,
      total: subtotal,
      pickupSlot: pickupSlot || 'Immediate (10-15 mins)',
      status: 'Placed',
      tokenNumber,
      createdAt: nowIso,
      statusHistory: [
        { status: 'Placed', timestamp: nowIso, note: 'Order placed by student' }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  // Update order status (used by Vendor Dashboard)
  const updateOrderStatus = (orderId, newStatus, customNote) => {
    const defaultNotes = {
      Placed: 'Order received by counter',
      Preparing: 'Staff is currently preparing your order',
      Ready: 'Order is packed and ready for pickup at counter!',
      Collected: 'Order handed over to student. Thank you!'
    };

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const historyEntry = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: customNote || defaultNotes[newStatus] || `Status updated to ${newStatus}`
          };

          return {
            ...order,
            status: newStatus,
            statusHistory: [...(order.statusHistory || []), historyEntry]
          };
        }
        return order;
      })
    );

    showToast(`Order status updated to "${newStatus}"`, 'info');
  };

  // Get orders for a specific student
  const getStudentOrders = (studentId) => {
    if (!studentId) return orders;
    return orders.filter((o) => o.studentId === studentId);
  };

  // Get orders for a specific vendor shop
  const getVendorOrders = (shopType) => {
    if (!shopType || shopType === 'all') return orders;
    return orders.filter((o) => o.shopType === shopType);
  };

  // Get order by ID
  const getOrderById = (id) => {
    return orders.find((o) => o.id === id || o.orderNumber === id);
  };

  // Computed metrics for Vendor Dashboard
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'Placed' || o.status === 'Preparing').length;
    const readyOrders = orders.filter((o) => o.status === 'Ready').length;
    const completedOrders = orders.filter((o) => o.status === 'Collected').length;
    const todayRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const canteenRevenue = orders
      .filter((o) => o.shopType === 'canteen')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const stationeryRevenue = orders
      .filter((o) => o.shopType === 'stationery')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalOrders,
      pendingOrders,
      readyOrders,
      completedOrders,
      todayRevenue,
      canteenRevenue,
      stationeryRevenue
    };
  }, [orders]);

  // Reset demo orders
  const resetOrders = () => {
    setOrders(INITIAL_ORDERS);
    setStorageItem('hiet_orders', INITIAL_ORDERS);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        getStudentOrders,
        getVendorOrders,
        getOrderById,
        stats,
        resetOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
