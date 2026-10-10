import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/seedData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();

  // Load active user from storage, default to Aarav Sharma for immediate hackathon demo
  const [currentUser, setCurrentUser] = useState(() => {
    return getStorageItem('hiet_auth_user', INITIAL_USERS[0]);
  });

  // Track all registered users in localStorage
  const [users, setUsers] = useState(() => {
    return getStorageItem('hiet_users_list', INITIAL_USERS);
  });

  useEffect(() => {
    setStorageItem('hiet_auth_user', currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStorageItem('hiet_users_list', users);
  }, [users]);

  // Quick switch between demo accounts (great for judges to quickly test both sides)
  const switchDemoAccount = (userId) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched account to ${found.name} (${found.role === 'vendor' ? found.shopName : 'Student'})`, 'info');
    }
  };

  // Mock Login
  const login = ({ email, password, role = 'student' }) => {
    // Check if user exists
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Auto-create a mock user if not found to provide a seamless demo experience
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      const capitalizedName = nameFromEmail
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      user = {
        id: 'user_' + Date.now(),
        name: capitalizedName || 'HIET Student',
        email,
        role: role,
        studentType: 'hosteller',
        hostelBlock: 'Raman Hostel',
        roomNumber: '202',
        phone: '+91 98765 00000',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        branch: 'B.Tech - HIET'
      };

      setUsers((prev) => [...prev, user]);
    }

    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  };

  // Mock Signup
  const signup = ({ name, email, studentType, hostelBlock, roomNumber, phone, branch }) => {
    const newUser = {
      id: 'user_' + Date.now(),
      name,
      email,
      role: 'student',
      studentType: studentType || 'hosteller',
      hostelBlock: studentType === 'hosteller' ? (hostelBlock || 'Kalam Hostel') : 'Day Scholar',
      roomNumber: studentType === 'hosteller' ? (roomNumber || '101') : 'N/A',
      phone: phone || '+91 98000 00000',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      branch: branch || 'B.Tech HIET Ghaziabad'
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created! Welcome to HIET Campus Mart, ${name}!`, 'success');
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out of session', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        signup,
        logout,
        switchDemoAccount,
        isVendor: currentUser?.role === 'vendor',
        isStudent: currentUser?.role === 'student'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
