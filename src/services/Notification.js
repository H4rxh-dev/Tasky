  import AsyncStorage from '@react-native-async-storage/async-storage';
  import PushNotification from 'react-native-push-notification';
  import { navigate } from '../Navigation/NavigationRef';
  import { AppState, InteractionManager } from 'react-native';
  import { useCallback, useEffect } from 'react';
  import { useFocusEffect } from '@react-navigation/native';
  import { notificationEmitter } from './Events';
  import { storeNotification } from './Storage';

  const Last_notification = 'lastScheduledNotification';

  const NOTIFICATIONS_KEY = 'storedNotifications';


export const configureNotifications = () => {
  PushNotification.configure({
    onNotification: async function (notification) {
      console.log("📩 Received Notification:", notification);

      if (!notification) {
        console.warn('⚠️ Received empty notification');
        return;
      }

     
      const formatted = {
        title: notification.title || 'No Title',
        message: notification.message || 'No Message',
        id: Date.now(),
        date: new Date().toLocaleString(),
        data: notification.data || {},
      };

      console.log("🧾 Formatted Notification to Store:", formatted);

      await storeNotification(formatted); 
    },

    requestPermissions: true,
    popInitialNotification: true,// Ensures notifications trigger on app open
  });

  PushNotification.createChannel(
    {
      channelId: "task-channel",
      channelName: "Task Notifications",
      importance: 4,
    },
    (created) => console.log(`📣 Channel created: ${created}`)
  );
};


  // export const showNotification = async () => {

  //   const notificationData = {
  //     title: "Task Reminder",
  //     message: "Create your task now!",
  //     id:Date.now(),
  //     date:new Date().toLocaleString(),
  //     data: {},
  //   };

  //   await storeNotification(notificationData);

  //   PushNotification.cancelAllLocalNotifications();

  //   PushNotification.localNotification({
  //     channelId: "task-channel",
  //     title: notificationData.title,
  //     message: notificationData.message,
  //     playSound: true,
  //     soundName: 'default',
  //     importance: "high",
  //   });
  // };
  
  export const scheduleHourlyNotification = async () => {
  try {
    const now = Date.now();
    const lastScheduled = await AsyncStorage.getItem(Last_notification);

if (lastScheduled && now - parseInt(lastScheduled, 10) < 60 * 60 * 1000) {
  console.log('⏳ Already scheduled within the hour. Skipping...');
  return;
}

    const fireDate = new Date(now + 5000); 
    const notificationData = {
      id: Date.now(),
      title: 'Task Reminder',
      message: 'Create your task now!',
      date: new Date().toLocaleString(),
    };

   
    await storeNotification(notificationData);

    if (AppState.currentState === "active") {
      notificationEmitter.emit('notificationAdded', notificationData);
    }
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: notificationData.title,
      message: notificationData.message,
      date: fireDate,
      allowWhileIdle: true,
      repeatType: 'hour',
      playSound: true,
      soundName: 'default',
      importance: 'high',
      visibility: 'public',
      data: notificationData,
    });

    await AsyncStorage.setItem(Last_notification, now.toString());

    console.log('✅ Scheduled & stored:', notificationData); 

  } catch (err) {
    console.error('❌ Error scheduling:', err);
  }
};