import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Mainapp from './Mainapp'
import { Theeprovider } from './src/Context/Themecontext'

const App = () => {


// useEffect(() => {
//     const timer = setTimeout(() => {
//       showLocalNotification('⏰ Reminder', 'Don’t forget to create a task!');
//     }, 5 * 60 * 1000); // 5 minutes

//     return () => clearTimeout(timer);
//   }, []);





return (
<>
<Theeprovider>
<Mainapp/>

</Theeprovider>
</>  )
}

export default App

const styles = StyleSheet.create({})  