import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/color';
import Svg, { Path } from 'react-native-svg';
import Home from '../Screen/Home';
import Track from '../Screen/Track';
import Stored from '../Screen/Stored';
import Profile from '../Screen/Profile';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const middleIndex = Math.floor(state.routes.length / 2);

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.svgContainer}>
<Svg  width={width} height={110} viewBox={`0 0 ${width} 80`} >
  <Path
    d={`
      M0 0
      H${width / 2 - 50}
      C${width / 2 - 30} 0, ${width / 2 - 30} 25, ${width / 2} 25
      C${width / 2 + 30} 25, ${width / 2 + 30} 0, ${width / 2 + 50} 0
      H${width}
      V45
      H0
      Z
    `}
    fill="#e7e0fd"
  />
</Svg>
      </View>

      <View style={styles.tabButtons}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          if (route.name === 'Add') {
            return (
              <TouchableOpacity 
                key={route.key}
                onPress={() => navigation.navigate("Detail")}
                style={styles.fab}
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
  onPress={() => navigation.navigate(route.name)}  // ✅ correct tab navigation
  style={styles.tabItem}
>
  <Ionicons
    name={iconName}
    size={25}
    color={isFocused ? colors.btncolor : colors.icon_outline}
  />
</TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Tabnavigation = () => {
  const navigation=useNavigation()

  return (
<Tab.Navigator screenOptions={{headerShown:false}}

  tabBar={(props) => <CustomTabBar {...props} />} // ✅ custom tab bar here
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
    bottom:0,
    width: width - 40,
    left: 20,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 0,
  },
  tabButtons: {
    flexDirection: 'row',
    width: width - 30,
    // paddingHorizontal: 20,
    paddingBottom: 15,
    marginBottom:30
  },
  tabItem: {
    flex: 1,
  alignItems:"center",
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    left: width / 2 - 24 - 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.btncolor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 5,
  },
});
