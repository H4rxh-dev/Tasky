import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  ScrollView,
  FlatList,
  useColorScheme
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';
import Progress from '../Components/Progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
  scale,
  verticalScale,
  moderateScale
} from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themecontext } from '../Context/Themecontext';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {
  const [progress, setProgress] = useState(85);
  const [modalVisible, setModalVisible] = useState(false);
  const [Item, setItem] = useState([])
  const [selectedId,setSelectedId] = useState(null);
  const{theme,isDark,toggletheme}=useContext(Themecontext)
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(80);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openModal = (id) =>{ 
    console.log("sagdjhfgjsgdfjhid===>",id)

    setSelectedId(id)
    console.log("id===>",id)

    setModalVisible(true)};
  const closeModal = () => setModalVisible(false);


  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        if (parsedTasks !== null) {
          console.log("Homyie task", parsedTasks)
          setItem(parsedTasks)
          // setInProgressTasks(parsedTasks.filter(task=>task.status==="In-progress"))

        } else {
setItem([])
        }


      };
      fetchTasks();
    }, [])
  );


console.log("selected==>",selectedId)



const deletetask=async(id)=>{
try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const Tasks = storedTasks ? JSON.parse(storedTasks) : [];

const deletedata=Tasks.filter(task=>task.id!==id)
 await AsyncStorage.setItem('tasks', JSON.stringify(deletedata));
   setItem(deletedata);

    closeModal();

console.log("getdeletedtaskID",id)
console.log("getdeletedtask",Tasks)
console.log("delete",deletedata)

  
} catch (error) {
     console.error("Error deleting task:", error)
}
}

const commingsoonToast = () => {
  Toast.show({
    type: "success",
    text1:"Adding soon..."
  });
};



console.log("Item=======>",Item)
  return (

    <SafeAreaView style={[styles.container,{backgroundColor:isDark?"black":colors.background}]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/groot.jpeg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View>
            <Text style={[styles.greeting ,{color:isDark?"white":'#64656a'} ]}>Hello!</Text>
            <Text style={[styles.name ,{color:isDark?"white":'#64656a'}]} >Groot</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Listscreen")}>
          <Ionicons name="notifications-outline" size={scale(24)} color={isDark?"white":'#64656a'} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(50) }}>

        <View style={styles.taskCard}>
          <TouchableOpacity onPress={commingsoonToast} style={styles.moreBtn}>
            <Ionicons name="ellipsis-horizontal" size={scale(18)} color="white" />
          </TouchableOpacity>

          <View style={styles.taskContent}>
            <Text style={styles.taskText}>Your today's task is almost done</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Track")} style={styles.btn}>
              <Text style={styles.btnText}>View Task</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginRight: scale(30), marginTop: verticalScale(10) }}>
            <AnimatedCircularProgress
              size={scale(50)}
              width={scale(3)}
              fill={progress}
              tintColor={colors.Whitebtn}
              backgroundColor={"#8764ff"}
            >
              {fill => (
                <Text style={{ color: colors.Whitebtn, fontSize: scale(10) }}>{Math.round(fill)}%</Text>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>

        <View style={styles.Progresscontainer}>
          <Text style={[styles.name ,{color:isDark?"white":'#64656a'}]}>In Progress</Text>
          <Text style={styles.procount}>{Item.length}</Text>
        </View>
<FlatList
  data={Item}
  keyExtractor={(item) => item.id.toString()}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
  snapToInterval={250 + 12} // CARD_WIDTH = width of your card
decelerationRate="fast"


  //  ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
  ListEmptyComponent={() => (
    <Progress
      item={{ title: "No Data",value:"Add task" ,progress: 0 }} // or your default dummy data
      openModal={openModal}
      isEmpty={true} // Optional: use this to style the placeholder differently
    />
  )}
  renderItem={({ item }) => (
    <Progress Item={item} openModal={openModal} />
  )}/>

        <View style={styles.Progresscontainer}>
          <Text style={[styles.Progress ,{color:isDark?"white":'#64656a'}]}>Task Group</Text>
          <Text style={styles.procount}>6</Text>
        </View>

        <View style={[styles.overviewCard,{backgroundColor:isDark?"white":"#ffffff"}]}>
          <View style={styles.overviewLeft}>
            <Ionicons name="person-circle-outline" size={scale(30)} color="#9260f4" />
            <View>
              <Text style={styles.overviewTitle       }>Office project</Text>
              <Text style={styles.overviewSub}>25 projects</Text>
            </View>
          </View>
          <View style={{ marginRight: scale(30), marginTop: verticalScale(10) }}>
            <AnimatedCircularProgress
              size={scale(50)}
              width={scale(3)}
              fill={progress}
              tintColor={"#9b6ef4"}
              backgroundColor={"#ede4ff"}
            >
              {fill => (
                <Text style={{ color: "#5d5e62", fontSize: scale(10) }}>{Math.round(fill)}%</Text>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>

        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={()=>{}}
        >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>

                <Text style={styles.modalText}>Are you sure you want to delete the task</Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity onPress={()=>deletetask(selectedId)} style={[styles.modalBtn, { backgroundColor: "green" }]}> 
                    <Text style={styles.modalBtnText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeModal} style={[styles.modalBtn, { backgroundColor: "red" }]}> 
                    <Text style={styles.modalBtnText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(24),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(16),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  profileImage: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    borderWidth: 1,
    borderColor: colors.btncolor,
  },
  greeting: {
    fontSize: scale(12),
  },
  name: {
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.textcolor,
  },
  taskCard: {
    backgroundColor: colors.btncolor,
    borderRadius: scale(20),
    marginTop: verticalScale(12),
    padding: scale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  moreBtn: {
    backgroundColor: '#9f85ed',
    borderRadius: scale(15),
    height: scale(26),
    width: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    zIndex: 1,
  },
  taskContent: {
    width: '60%',
    gap: verticalScale(24),
  },
  taskText: {
    color: '#fcfbfe',
    fontSize: scale(12),
  },
  btn: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(10),
    alignSelf: 'flex-start',
  },
  btnText: {
    color: colors.btncolor,
    fontSize: scale(12),
    fontWeight: '700',
  },
  Progresscontainer: {
    marginTop: verticalScale(18),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    marginBottom: verticalScale(6),
    paddingLeft: scale(8),
  },
  Progress: {
    fontSize: scale(18),
    fontWeight: '700',
    color: colors.textcolor,
  },
  procount: {
    backgroundColor: "#f6f3ff",
    height: verticalScale(24),
    width: scale(20),
    borderRadius: scale(5),
    textAlign: 'center',
    lineHeight: verticalScale(20),
    fontSize: scale(10),
    color: '#805de8',
    marginTop: verticalScale(4),
  },
  overviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    padding: scale(11),
    borderRadius: scale(20),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  overviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  overviewTitle: {
    color: '#747081',
    fontSize: scale(12),
    fontWeight: '700',
  },
  overviewSub: {
    fontSize: scale(9),
    color: '#747081',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: scale(20),
  },
  modalContent: {
    backgroundColor: "white",
    // height: verticalScale(170),
    // width: "90%",
    padding: scale(20),
    justifyContent: "center",
    gap: verticalScale(30),
    borderRadius: scale(10)
  },
  modalText: {
    textAlign: "center",
    fontSize: scale(16),
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalBtn: {
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: scale(7),
  },
  modalBtnText: {
    color: colors.Whitebtn,
    fontSize: scale(13),
  },
});
