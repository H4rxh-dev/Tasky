import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';
import Started from '../Screen/Started';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const Stack = createNativeStackNavigator();
const Stacknavigation = () => {
    // const[userdata,setuserdata]=useState(null)
    const [initialRoute, setInitialRoute] = useState(null);

useEffect(()=>{


const fetch=async()=>{
try {
  
let hasstarted=await AsyncStorage.getItem("User")

      setInitialRoute(hasstarted === 'true' ? 'Home' : 'Started');

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


{/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
  <Image
    source={require('../assets/Reat_img.png')}
    style={{ width: 120, height: 120, marginBottom: 30 }}
  />
  <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 15 }}>
    Welcome back!
  </Text>
  <ActivityIndicator size="large" color="#4CAF50" />
</View> */}










return (
    <>
     <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
   
      <Stack.Screen name="Started" component={Started} />

      <Stack.Screen name="Home" component={Home} />
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

