import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../styles/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureNotifications, scheduleHourlyNotification, showNotification } from '../services/Notification'
import { requestExactAlarmPermission, requestNotificationPermission } from '../services/AlarmPermissionService'
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale
} from 'react-native-size-matters';

const Started = ({ navigation }) => {

  const started = async () => {
    try {
      await AsyncStorage.setItem("User", "true");
      await requestNotificationPermission();
      configureNotifications();

      const alarmAsked = await AsyncStorage.getItem('AlarmPermissionAsked');
      if (!alarmAsked && Platform.Version >= 31) {
        await requestExactAlarmPermission();
        await AsyncStorage.setItem('AlarmPermissionAsked', 'true');
      }

      await scheduleHourlyNotification();
      navigation.replace('Bottom');
      console.log("✅ User onboarded and notification setup done.");
    } catch (error) {
      console.error("❌ Error in onboarding:", error);
    }
  };

  return (
    <View style={styles.contain}>
      <Image
        source={require('../assets/Reat_img.png')}
        style={styles.image}
        resizeMethod='contain'
      />

      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Task Management & {"\n"}To-Do List
          </Text>

          <View style={styles.subTextGroup}>
            <Text style={styles.txts}>This productive tool is designed to help</Text>
            <Text style={styles.txts}>you better manage your task</Text>
            <Text style={styles.txts}>project-wise conveniently!</Text>
          </View>
        </View>

        <TouchableOpacity onPress={started} style={styles.btn}>
          <Text style={styles.txt}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Started;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    padding: moderateScale(24),
    backgroundColor: colors.background,
    justifyContent: "space-evenly"
  },
  image: {
    height: verticalScale(300),
    width: scale(300),
    backgroundColor: colors.background,
    alignSelf: "center"
  },
  textContainer: {
    justifyContent: "space-between",
    padding: moderateScale(14)
  },
  header: {
    marginBottom: verticalScale(36)
  },
  title: {
    textAlign: "center",
    fontSize: moderateScale(22),
    fontWeight: '700',
    fontFamily: "Inter-Regular",
    color: "#24252c"
  },
  subTextGroup: {
    marginTop: verticalScale(24)
  },
  txts: {
    fontSize: moderateScale(12),
    fontFamily: "Inter-Regular",
    textAlign: "center",
    color: "#96939e",
    fontWeight: '600',
    marginBottom: verticalScale(4)
  },
  btn: {
    backgroundColor: colors.btncolor,
    padding: moderateScale(16),
    borderRadius: moderateScale(15)
  },
  txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: moderateScale(14),
    fontWeight: '700'
  }
});
