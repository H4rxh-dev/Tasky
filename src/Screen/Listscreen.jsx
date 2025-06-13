import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, AppState, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationEmitter } from '../services/Events';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/color';
import { Themecontext } from '../Context/Themecontext';

const NOTIFICATIONS_KEY = 'storedNotifications';

const Listscreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const { theme, isDark, toggletheme } = useContext(Themecontext);
  const tick = (
    <Ionicons name="arrow-back-outline" size={25} color={isDark ? 'white' : colors.textcolor} />
  );

  const goingback = () => {
    navigation.navigate('Bottom');
  };

  useFocusEffect(
    useCallback(() => {
      const loadNotifications = async () => {
        const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('🔄 Refetched on screen focus:', parsed);
          setNotifications(parsed);
        }
      };
      loadNotifications();
    }, [])
  );

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        setNotifications(parsed);
        console.log('📦 Loaded notifications:', parsed);
      } catch (error) {
        console.error('❌ Error loading notifications:', error);
      }
    };

    loadNotifications();

    const handler = (newNotif) => {
      console.log('📥 Received new notification:', newNotif);
      setNotifications((prev) => [newNotif, ...prev]);
    };

    notificationEmitter.addListener('notificationAdded', handler);
    return () => {
      notificationEmitter.removeListener('notificationAdded', handler);
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.notificationItem, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{item.title}</Text>
      <Text style={[styles.message, { color: isDark ? '#ccc' : '#333' }]}>{item.message}</Text>
      <Text style={[styles.date, { color: isDark ? '#999' : '#888' }]}>{item.date}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingVertical: 23,
          borderBottomColor: isDark ? '#444' : 'gray',
          borderBottomWidth: 0.2,
        }}
      >
        <TouchableOpacity onPress={goingback} style={{ position: 'absolute', left: 0 }}>
          {tick}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: 'Inter-Regular',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 14,
            color: isDark ? '#fff' : colors.textcolor,
          }}
        >
          Notification
        </Text>
      </View>

      {notifications.length === 0 ? (
        <Text style={[styles.emptyText, { color: isDark ? '#aaa' : '#666' }]}>
          No notifications yet
        </Text>
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
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
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
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
