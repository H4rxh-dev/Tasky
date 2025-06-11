import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationEmitter } from './Events';

const NOTIFICATIONS_KEY = 'storedNotifications';
export const storeNotification = async (notification) => {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    const data = existing ? JSON.parse(existing) : [];

    const updated = [notification, ...data];
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));

    console.log("📤 Emitting notificationAdded with:", notification); // <-- ADD THIS LINE
    notificationEmitter.emit('notificationAdded', notification); 
  } catch (err) {
    console.error('🛑 Failed to store notification:', err);
  }
};


export const getStoredNotifications = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
  return data ? JSON.parse(data) : [];
  
};
