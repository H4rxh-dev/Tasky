import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Stacknavigation from './src/Navigation/Stacknavigation'
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import { NavigationRef } from './src/Navigation/NavigationRef';

const Mainapp = () => {
// useEffect(() => {
//     // Create a channel for Android
//     PushNotification.createChannel(
//       {
//         channelId: 'task-reminder-channel', // match this with localNotification
//         channelName: 'Task Reminder Channel',
//         importance: 4, // HIGH: show heads-up
//       },
//       (created) => console.log(`🔔 Channel created: ${created}`),
//     );
//   }, []);

  return (
<NavigationContainer ref={NavigationRef}>
<Stacknavigation/>
      <Toast />

</NavigationContainer>
)
}

export default Mainapp

const styles = StyleSheet.create({})