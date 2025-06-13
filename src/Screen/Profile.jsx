import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../styles/color';

import { Themecontext } from '../Context/Themecontext';
import Toast from 'react-native-toast-message';

const Profile = ({ navigation }) => {

  const{theme,isDark,toggletheme}=useContext(Themecontext)


  const tick = <Ionicons name="arrow-back-outline" size={moderateScale(25)} color={isDark?"white":colors.textcolor} />;
  const notification = <Ionicons  name="notifications-outline" size={scale(24)} color={isDark?"white":'#64656a'} />
  const notification2 = <Ionicons  name="notifications-outline" size={scale(24)} color={isDark?"black":'white'} />

  const task = <Ionicons name="document-text" size={moderateScale(25)} color={colors.textcolor} />;
  const logout = <Ionicons name="log-out-outline" size={moderateScale(25)} color={colors.textcolor} />;
  const settings = <Ionicons name="settings-outline" size={moderateScale(25)} color={colors.textcolor} />;

  const goingBack = () => {
    navigation.goBack();
  };
const toggleThemeWithToast = () => {
  toggletheme();
  Toast.show({
    type: "success",
    text1: isDark ? 'Light mode enabled' : 'Dark mode enabled',
  });
};
const commingsoonToast = () => {
  Toast.show({
    type: "success",
    text1:"Adding soon..."
  });
};





  console.log(theme,isDark)
  return (
    <SafeAreaView style={[styles.safe,{backgroundColor:isDark?"black":colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goingBack}>
            <Text>{tick}</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle ,{color:isDark?"white":'#64656a'}]}>Profile</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Listscreen")}>
          <Text>{notification}</Text>

          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/groot.jpeg')}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.profileName ,{color:isDark?"white":'#64656a'}]}>Groot</Text>
            <Text style={[styles.profileTagline ,{color:isDark?"white":'#gray'}]}>I am groot</Text>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.optionsList}>
          <TouchableOpacity  onPress={()=>navigation.navigate("Track")} style={styles.optionItem}>
            <Text>{task}</Text>
            <Text style={styles.optionText}>Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=>navigation.navigate("Listscreen")} style={styles.optionItem}>
            <Text>{notification2}</Text>
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>

          <View style={styles.optionItem}>
  <Switch
              value={isDark}
              onValueChange={toggleThemeWithToast}
              thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />        
            
            
                <Text style={styles.optionText}>{theme} mode</Text>

          </View>

          <TouchableOpacity onPress={commingsoonToast} style={styles.optionItem}>
            <Text>{settings}</Text>
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={commingsoonToast} style={[styles.optionItem, styles.logoutItem]}>
            <Text>{logout}</Text>
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    padding: moderateScale(15),
    paddingBottom: verticalScale(100), // Prevents overlap with FAB or bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
  },
  headerTitle: {
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: moderateScale(22),
    color: colors.textcolor,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(30),
    paddingHorizontal: scale(20),
    gap: moderateScale(15),
  },
  profileImage: {
    height: moderateScale(90),
    width: moderateScale(90),
    borderWidth: 1,
    borderColor: colors.btncolor,
    borderRadius: 100,
  },
  profileName: {
    fontWeight: '600',
    fontSize: moderateScale(24),
    color: colors.textcolor,
  },
  profileTagline: {
    color: 'gray',
    fontSize: moderateScale(14),
    marginTop: verticalScale(4),
  },
  optionsList: {
    paddingHorizontal: scale(18),
    gap: verticalScale(20),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(25),
    backgroundColor: '#ffffff',
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    elevation: 2,
  },
  logoutItem: {
    marginBottom: verticalScale(80), // Push logout above FAB
  },
  optionText: {
    fontSize: moderateScale(15),
    color: '#333',
  },
});
