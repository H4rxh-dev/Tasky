import { ActivityIndicator, Image, Platform, StyleSheet, Text, View, Linking, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Started from '../Screen/Started';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Tabnavigation from './Tabnavigation';
import Profile from '../Screen/Profile';
import Stored from '../Screen/Stored';
import Detail from '../Screen/Detail';
import { configureNotifications, scheduleHourlyNotification } from '../services/Notification';
import { requestExactAlarmPermission, requestNotificationPermission } from '../services/AlarmPermissionService';
import Listscreen from '../Screen/Listscreen';

const Stack = createNativeStackNavigator();
const Stacknavigation = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const NOTIFICATIONS_KEY = 'storedNotifications';


  useEffect(() => {
    const initializeApp = async () => {
      const hasStarted = await AsyncStorage.getItem('User');
      console.log("hasstaerd====>", hasStarted)
      if (hasStarted === 'true') {

        await requestNotificationPermission();
        configureNotifications();
        await scheduleHourlyNotification();
        setInitialRoute('Bottom');

      } else {
        setInitialRoute('Started');
      }
    };
    initializeApp();
  }, []);





  console.log("initialroute", initialRoute)

  if (!initialRoute) {
    return (

      <View style={styles.container}>
        <LottieView
          source={require('../assets/spinner.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.text}>Loading your experience...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animation: "slide_from_bottom", gestureEnabled: true, fullScreenGestureEnabled: true }}>

        <Stack.Screen name="Started" component={Started} />

        <Stack.Screen name="Bottom" component={Tabnavigation} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Stored" component={Stored} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Listscreen" component={Listscreen} />


      </Stack.Navigator>
    </>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

