import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';








const tick =<Ionicons name="arrow-back-outline" size={25} color={colors.textcolor} />
const notification =<Ionicons name="notifications" size={20} color={colors.textcolor} />



const Profile = ({navigation}) => {


const goingback=()=>{
  navigation.goBack()
}


  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.background,justifyContent:"space-between"}}>
<View>

    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:20}}>
      <TouchableOpacity onPress={goingback}>
      <Text>{tick}</Text>
      </TouchableOpacity>
    <Text style={{fontFamily:"Inter-Regular",fontWeight:700,fontSize:17,color:colors.textcolor}}>Profile</Text>
    <Text>{notification}</Text>
    </View>

      
     <View style={{}} >
              <Image
                source={require('../assets/groot.jpeg')}
                resizeMode="cover"
                style={{height:150,width:150,borderWidth:3,borderColor:colors.btncolor,borderRadius:100}}
              />
              <Text>I am groot</Text>
              </View>
</View>




    </SafeAreaView>

  )
}

export default Profile

const styles = StyleSheet.create({})