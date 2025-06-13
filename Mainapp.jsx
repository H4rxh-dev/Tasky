import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Stacknavigation from './src/Navigation/Stacknavigation'
import PushNotification from 'react-native-push-notification';
import Toast, { BaseToast } from 'react-native-toast-message';
import { NavigationRef } from './src/Navigation/NavigationRef';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

const toastConfig = {
  successGreen: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
    />
  ),
};


  return (

    <SafeAreaProvider>

<NavigationContainer ref={NavigationRef}>
<Stacknavigation/>
<Toast config={toastConfig} />

</NavigationContainer>
    </SafeAreaProvider>

)
}

export default Mainapp

const styles = StyleSheet.create({})