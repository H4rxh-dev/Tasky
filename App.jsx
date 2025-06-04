import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Mainapp from './Mainapp'

const App = () => {


// useEffect(() => {
//     const timer = setTimeout(() => {
//       showLocalNotification('⏰ Reminder', 'Don’t forget to create a task!');
//     }, 5 * 60 * 1000); // 5 minutes

//     return () => clearTimeout(timer);
//   }, []);





return (
<>
<Mainapp/>
</>  )
}

export default App

const styles = StyleSheet.create({})  