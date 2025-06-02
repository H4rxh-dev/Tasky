import { StyleSheet, Text, View,TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';
import Dateslider from '../Components/Dateslider';
import { ScrollView } from 'react-native'; // add t




const delet=<Ionicons name="trash" size={13} color={"#f478b8"} />   

const time =<Ionicons name="time" size={13} color={"#ab94ff"} />
const tick =<Ionicons name="arrow-back-outline" size={25} color={colors.textcolor} />
const notification =<Ionicons name="notifications" size={20} color={colors.textcolor} />



const Track = ({navigation}) => {
const [selected,setselected]=useState("All")
const tabs = ['All', 'Todo', 'In Progress', 'Completed'];















const data = {
  All: [
    { id: '1', title: 'Buy groceries' },
    { id: '2', title: 'Write report' },
    { id: '3', title: 'Fix bugs' },
    { id: '4', title: 'Review PR' },
  ],
  Todo: [
    { id: '1', title: 'Buy groceries' },
    { id: '2', title: 'Write report' },
  ],
  'In Progress': [
    { id: '3', title: 'Fix bugs' },
  ],
  Completed: [
    { id: '4', title: 'Review PR' },
  ],
};


const goingback=()=>{
  navigation.goBack()
}


  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.background,padding:25}}>

    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
      <TouchableOpacity onPress={goingback}>
      <Text>{tick}</Text>
      </TouchableOpacity>
    <Text style={{fontFamily:"Inter-Regular",fontWeight:700,fontSize:17,color:colors.textcolor}}>Today's Task</Text>
    <Text>{notification}</Text>
    </View>
<Dateslider/>

<View style={{ paddingVertical: 10 }}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabContainer}
  >
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => setselected(tab)}
        style={[
          styles.tab,
          {
            backgroundColor: selected === tab ? '#805ee7' : '#f6f3ff',
          },
        ]}
      >
        <Text
          style={{
            color: selected === tab ? '#eae4fb' : '#7954e6',
            fontWeight: 'bold',
            fontFamily:"Inter-Regular"
          }}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>



</View>

    <View style={styles.card}>
<View style={{width:"80%",gap:10,paddingHorizontal:6}}>
        <Text style={styles.title}>
        Groceray shopping app design
          </Text>
      <Text style={styles.subtitle}>
Market Research
        </Text>
        <Text >{time}  12:00 </Text>

      </View>
<View style={{padding:2}}>
        <Text style={styles.star}>{delet}</Text>


</View>
    </View>






    </SafeAreaView>

  )
}

export default Track

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    
  },
  tab: {
    paddingHorizontal: 27,
    paddingVertical: 8,
    borderRadius: 9,
    marginRight: 10,
    marginTop:10,
    borderColor:"#8766e9",
    borderWidth:0.1
  },  
  card: {
    width:"100%",
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    marginTop: 10,
    borderColor:"#7e7a8a",
    borderWidth:0.2,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  title: {
    fontSize: 10,
    color: '#7e7a8a',
    fontFamily:"Inter_Regular"
  },
  star: {
    fontSize: 13,
    backgroundColor:"#ffe4f2",
    padding:5,borderRadius:6
  },
  subtitle: {
    fontSize: 12,
    color: '#0b0c0c',

fontWeight:600},
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },

})