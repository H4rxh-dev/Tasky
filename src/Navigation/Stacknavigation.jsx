import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Started from '../Screen/Started';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Tabnavigation from './Tabnavigation';
import Profile from '../Screen/Profile';
import Stored from '../Screen/Stored';
import Detail from '../Screen/Detail';

const Stack = createNativeStackNavigator();
const Stacknavigation = () => {
    const [initialRoute, setInitialRoute] = useState(null);

useEffect(()=>{


const fetch=async()=>{
try {
  
let hasstarted=await AsyncStorage.getItem("User")

      setInitialRoute(hasstarted === 'true' ? 'Bottom' : 'Started');

console.log("initialroute",initialRoute)





} catch (error) {
console.log("error in navigating",error)
  
}



}


fetch()

},[])    

console.log("intialwa",initialRoute)


// 👇 PLACE THE LOADING VIEW HERE
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
     <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
   
      <Stack.Screen name="Started" component={Started} />

      <Stack.Screen name="Bottom" component={Tabnavigation} />

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Stored" component={Stored} />
      <Stack.Screen name="Detail" component={Detail} />



      </Stack.Navigator>
    </>
)}

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

