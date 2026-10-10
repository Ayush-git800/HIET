// LocalStorage helper with safe parsing and error handling

export const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`[HIET Campus Mart] Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[HIET Campus Mart] Error writing to localStorage key "${key}":`, error);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[HIET Campus Mart] Error removing localStorage key "${key}":`, error);
  }
};
