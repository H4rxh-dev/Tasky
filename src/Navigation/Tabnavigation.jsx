import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

import Home from '../Screen/Home';
import Track from '../Screen/Track';
import Stored from '../Screen/Stored';
import Profile from '../Screen/Profile';
import { colors } from '../styles/color';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets(); // ✅ Correct position
  const middleIndex = Math.floor(state.routes.length / 2);

  return (
<View
  style={[
  styles.tabBarWrapper,
  {
    paddingBottom: insets.bottom || verticalScale(10), // Fallback
    height: verticalScale(53) + (insets.bottom || verticalScale(10)),
  },
]}

>

      {/* SVG Curved Background */}
      <View style={styles.svgContainer}>
   <Svg width={width} height={100} viewBox={`0 0 ${width} 80`}>
  <Path
    d={`
      M0 0
      H${width / 2 - 50}
      C${width / 2 - 30} 0, ${width / 2 - 30} 25, ${width / 2} 25
      C${width / 2 + 30} 25, ${width / 2 + 30} 0, ${width / 2 + 50} 0
      H${width}
      V80
      H0
      Z
    `}
    fill="#e7e0fd"
  />
</Svg>


      </View>

      {/* Tab Buttons */}
      <View style={styles.tabButtons}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          // FAB logic
          if (route.name === 'Add') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate('Detail')}
              style={[
  styles.fab,
  {
    bottom:
      (insets.bottom || verticalScale(30)) + // fallback if insets is 0
      verticalScale(30),
  },
]}


              >
                <Ionicons name="add" size={30} color="white" />
              </TouchableOpacity>
            );
          }

          const iconName = {
            Home: 'home',
            Track: 'calendar',
            Stored: 'document-text',
            Profile: 'person',
          }[route.name];

          return (
              <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.iconWrapper,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused ? colors.btncolor : colors.icon_outline}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
  //                 color={isFocused ? colors.btncolor : colors.icon_outline}

};

const Tabnavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, animation: 'shift' }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="Add" component={Home} />
      <Tab.Screen name="Stored" component={Stored} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabnavigation;
const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    zIndex: 0,
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width,
    height: verticalScale(80),
    paddingBottom: verticalScale(5),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    borderRadius: scale(20),
    width: scale(45),
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    left: width / 2 - scale(30),
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: colors.btncolor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 5,
  },
});