import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => 
    addNotification(message, 'success', duration), [addNotification]);
  
  const showError = useCallback((message, duration) => 
    addNotification(message, 'error', duration), [addNotification]);
  
  const showWarning = useCallback((message, duration) => 
    addNotification(message, 'warning', duration), [addNotification]);
  
  const showInfo = useCallback((message, duration) => 
    addNotification(message, 'info', duration), [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};