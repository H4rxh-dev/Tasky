import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
    import { navigate } from '../Navigation/NavigationRef';
import { notificationEmitter } from './Events';
import { InteractionManager } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

    const Last_notification = 'lastScheduledNotification';

const NOTIFICATIONS_KEY = 'storedNotifications';


 
export const storeNotification = async (notification={}) => {
try {
   console.log('🔔 [saveNotification] Incoming notification:', notification);
    const existing= await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    const notifications = existing ? JSON.parse(existing) : [];

console.log('📦 Now saved in AsyncStorage:',notifications)
   console.log("existingsdata",existing)

const newNotification = {
      ...notification,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
 const updated = [newNotification, ...notifications];
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
        const existing1= await AsyncStorage.getItem(NOTIFICATIONS_KEY);

console.log("fffffffffffff", existing1);

  notificationEmitter.emit('notificationAdded', newNotification);
    console.log('✅ Notification emitted', newNotification);

    console.log('✅ [saveNotification] Notification saved:', newNotification);
    console.log('📤 [saveNotification] Updated list stored:', notifications);
} catch (error) {
    console.error('Error storing notification:', error);
  }
};

    export const configureNotifications = () => {
        PushNotification.configure({
            onNotification: function (notification) {
console.log("notifucationsssssssss",notification)
    if (!notification) {
      console.warn('Received empty notification');
      return;
    }

                console.log("NOTIFICATION:===========>", notification);
                storeNotification(notification);
                console.log('Incoming notification:', JSON.stringify(notification, null, 2));

                if (notification.userInteraction) {
                    navigate("Detail", { task: notification?.data.task })
                }

            },
            requestPermissions: true,
        });

        PushNotification.createChannel(
            {
                channelId: "task-channel",
                channelName: "Task Notifications",
                importance: 4,
            },
            (created) => console.log(`Channel created: ${created}`)
        );
    };

    export const showNotification =async () => {
        
          const notificationData = {
    title: "Task Reminder",
    message: "Create your task now!",
    data: {},
  };

  await storeNotification(notificationData); 
 
        PushNotification.cancelAllLocalNotifications();

       PushNotification.localNotification({
    channelId: "task-channel",
    title: notificationData.title,
    message: notificationData.message,
    playSound: true,
    soundName: 'default',
    importance: "high",
  });
    };
    
    export const scheduleHourlyNotification = async () => {
  try {
    const now = Date.now();
    const lastScheduled = await AsyncStorage.getItem(Last_notification);

    if (lastScheduled && now - parseInt(lastScheduled, 10) <  60 * 1000) {

    console.log('⏳ Notification already scheduled within the hour. Skipping...');
      return;
    }

    PushNotification.cancelAllLocalNotifications();

    const fireDate = new Date(now + 5 * 1000);
    console.log('🔔 Scheduling notification at:', fireDate.toLocaleString());

    const notificationData = {
      title: '🕐 Task Reminder',
      message: 'Create a new task!',
      data: {},
    };

   
    await storeNotification(notificationData);

    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: notificationData.title,
      message: notificationData.message,
      date: fireDate,
      allowWhileIdle: true,
      repeatType: 'minute',

      playSound: true,
      soundName: 'default',
      importance: 'high',
      visibility: 'public',
      data: notificationData.data, // Attach any data you want
    });

    await AsyncStorage.setItem(Last_notification, now.toString());

  } catch (error) {
    console.error('❌ Error scheduling notification:', error);
  }
};
