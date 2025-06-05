import PushNotification from 'react-native-push-notification';
import { navigate } from '../Navigation/NavigationRef';

export const configureNotifications = () => {
    PushNotification.configure({
        onNotification: function (notification) {

            console.log("NOTIFICATION:", notification);
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

export const showNotification = () => {
    PushNotification.localNotification({
        channelId: "task-channel",
        title: "Task Reminder",
        message: "Create your task now!",
        playSound: true,
        soundName: 'default',
        importance: "high",
    });
};
export const scheduleHourlyNotification = () => {
    const fireDate = new Date(Date.now() + 10 * 1000);

    console.log('Notification scheduled at:', fireDate);

    PushNotification.localNotificationSchedule({
        channelId: 'task-channel',
        title: 'Task Reminder',
        message: '🕐 Time to create a new task!',
        date: fireDate,
        allowWhileIdle: true,
        repeatType: 'minute',
        playSound: true,
        soundName: 'default',
        importance: 'high',
        visibility: 'public',
    });
};
