  import { Platform, Linking, AppState, PermissionsAndroid } from 'react-native';
  import { NativeModules } from 'react-native';
  const { AlarmManagerModule } = NativeModules; 

  let alreadyRequested = false;

  export const requestExactAlarmPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      if (alreadyRequested) return;
      alreadyRequested = true;
      console.log('Opening alarm permission settings...');
      Linking.openSettings();

      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
          console.log('Returned from settings');
          alreadyRequested = false;
          subscription.remove(); 
        }
      });
    } else {
      console.log('Exact alarm permission not required for this Android version');
    }
  };


export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('✅ Android 13+ notification permission granted');
        return true;
      } else {
        console.log('❌ Android 13+ notification permission denied');
        return false;
      }
    } else {
      // Android < 13: permission not needed
      console.log('✅ Android < 13: no notification permission needed');
      return true;
    }
  } else if (Platform.OS === 'ios') {
    const result = await PushNotification.requestPermissions();
    if (result?.alert === true) {
      console.log('✅ iOS notification permission granted');
      return true;
    } else {
      console.log('❌ iOS notification permission denied');
      return false;
    }
  }
  return false;
}