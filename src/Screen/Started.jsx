import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../styles/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Started = ({navigation}) => {

  const started=async()=>{

try {
  
let data=await AsyncStorage.setItem("User","true")
      navigation.replace('Bottom'); // Replace to prevent going back to StartedScreen

console.log("user hai bhai")
} catch (error) {
  
}



  }
  
  
  
  
  return (
    <View style={styles.contain}>
  <Image
  source={require('../assets/Reat_img.png')}
  style={{
    height:350,
    width: 330,
   backgroundColor:colors.background 
  }}
resizeMethod='contain'

/>

<View style={{justifyContent:"space-between",padding:14}}>
<View style={{marginBottom:36}}>

<Text style={{textAlign:"center",fontSize:22,fontWeight:700,fontFamily:"Inter-Regular",color:"#24252c"}}>Task Management & {"\n"}
    To-Do List
</Text>

<View style={{marginTop:30}}>

<Text style={styles.txts}>
    This productive  tool is designed to help
</Text>

<Text style={styles.txts}>
    you better manage your task
</Text>
<Text style={styles.txts}>
    

project-wise conveniently!
</Text>

</View>






</View>

    <TouchableOpacity  onPress={started} style={styles.btn}>
        <Text style={styles.txt}>Let's Start</Text> 
    </TouchableOpacity>
</View>
    </View>
  )
}

export default Started

const styles = StyleSheet.create({
contain:{
    flex:1,
    padding:30,
backgroundColor:colors.background,
justifyContent:"space-evenly"

},image: {
    width: 220,
    height: 220,
    // resizeMode: 'contain',
  },btn:{
backgroundColor:colors.btncolor,padding:20,borderCurve:50,borderRadius:15
  },txt:{
    textAlign:"center",color:"#ffffff",fontSize:14,fontWeight:700
  },
      txts:{fontSize:12,fontFamily:"Inter_Regular",textAlign:"center",color:"#96939e",fontWeight:600}



})