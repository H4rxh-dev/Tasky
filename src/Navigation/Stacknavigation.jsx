import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';
import Started from '../Screen/Started';


const Stack = createNativeStackNavigator();
const Stacknavigation = () => {

    
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