import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';
import Started from '../Screen/Started';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Stacknavigation = () => {
    // const[userdata,setuserdata]=useState(null)
    // const[firstlaunch,setfirstlaucnh]=useState(null)

    
  return (
    <>
     <Stack.Navigator screenOptions={{headerShown:false}}>
   
      <Stack.Screen name="Started" component={Started} />

      <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </>
)}

export default Stacknavigation

const styles = StyleSheet.create({})