import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationEmitter } from '../services/Events';
import { useFocusEffect } from '@react-navigation/native';
const NOTIFICATIONS_KEY = 'storedNotifications';

const Listscreen = () => {
  const [notifications, setNotifications] = useState([]);

useFocusEffect(
  useCallback(() => {
    const loadNotifications = async () => {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("🔄 Refetched on screen focus:", parsed);
        setNotifications(parsed);
      }
    };

    loadNotifications();
  }, [])
);



useEffect(() => {
  // Load notifications when screen mounts
  const loadNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setNotifications(parsed);
      console.log("📦 Loaded notifications:", parsed);
    } catch (error) {
      console.error("❌ Error loading notifications:", error);
    }
  };

  loadNotifications();

  // Listen for new notifications
  const handler = (newNotif) => {
    console.log("📥 Received new notification:", newNotif);
    setNotifications((prev) => [newNotif, ...prev]);
  };

  notificationEmitter.addListener('notificationAdded', handler);
  return () => {
    notificationEmitter.removeListener('notificationAdded', handler);
  };
}, []);
      console.log("📦 Loaded notifications:", notifications);


  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications yet</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Listscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  message: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

