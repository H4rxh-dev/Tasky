import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Stacknavigation from './src/Navigation/Stacknavigation'

const Mainapp = () => {

  return (
<NavigationContainer>
<Stacknavigation/>
</NavigationContainer>
)
}

export default Mainapp

const styles = StyleSheet.create({})