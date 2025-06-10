import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationEmitter } from '../services/Events';
import { useFocusEffect } from '@react-navigation/native';

const NOTIFICATIONS_KEY = 'storedNotifications';

const Listscreen = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      const list = stored ? JSON.parse(stored) : [];

      
      console.log('📥 Notifications Fetched:', list);
      setNotifications(list);
    } catch (error) {
      console.error('❌ Error loading notifications:', error);
    }
  };

  // 🔁 Refresh when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  // 🔔 Refresh when a new notification is added via event
  useEffect(() => {
    const onNotificationAdded = async () => {
      await fetchNotifications();
    };

    notificationEmitter.addListener('notificationAdded', onNotificationAdded);
    return () => {
      notificationEmitter.removeListener('notificationAdded', onNotificationAdded);
    };
  }, []);

  // ⏱️ Optional: Periodically refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
      console.log("🔄 Periodic fetch triggered");
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // 🔧 FlatList item rendering
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

