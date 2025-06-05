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
import messaging from "@react-native-firebase/messaging"
import { configureNotifications, scheduleHourlyNotification } from '../services/Notification';
import { requestExactAlarmPermission, requestNotificationPermission } from '../services/AlarmPermissionService';

const Stack = createNativeStackNavigator();
const Stacknavigation = () => {
  const [initialRoute, setInitialRoute] = useState(null);


  useEffect(() => {

    getdevicetoken()

  }, [])

  const getdevicetoken = async () => {

    let token = await messaging().getToken()
    console.log("token====>", token)
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const hasStarted = await AsyncStorage.getItem('User');
        console.log('Notification scheduled hasStarted:', hasStarted);
        if (hasStarted === 'true') {
          setInitialRoute('Bottom');

 await requestNotificationPermission();

 configureNotifications();

        const alarmAsked = await AsyncStorage.getItem('AlarmPermissionAsked');
console.log("Alarmaskeftdy",alarmAsked)
        if (!alarmAsked && Platform.Version >= 31) {
          await requestExactAlarmPermission();
          await AsyncStorage.setItem('AlarmPermissionAsked', 'true'); // so it won't repeat
        }

        scheduleHourlyNotification()     

        } else {
          setInitialRoute('Started');
        }

      } catch (error) {
        console.error('Error during app init:', error);
      }
    };
    initializeApp();
  }, []);


  console.log("intialwa", initialRoute)

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
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Started" component={Started} />

        <Stack.Screen name="Bottom" component={Tabnavigation} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Stored" component={Stored} />
        <Stack.Screen name="Detail" component={Detail} />

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

