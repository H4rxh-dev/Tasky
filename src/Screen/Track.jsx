import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';
import Dateslider from '../Components/Dateslider';
import { ScrollView } from 'react-native'; // add t
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Cards from '../Components/Cards';
import { Modal } from 'react-native-paper';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale
} from 'react-native-size-matters';
import { Themecontext } from '../Context/Themecontext';
import { Colors } from 'react-native/Libraries/NewAppScreen';




const delet = <Ionicons name="trash" size={13} color={"#f478b8"} />

const time = <Ionicons name="time" size={13} color={"#ab94ff"} />



const Track = ({ navigation }) => {

  const [track, setTrack] = useState([])
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [selected, setselected] = useState("All")
  const tabs = ['All', 'In Progress', 'Completed'];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { theme, isDark, toggletheme } = useContext(Themecontext);
  const tick = <Ionicons name="arrow-back-outline" size={moderateScale(25)} color={isDark?"white":colors.textcolor} />;
  const notification = <Ionicons  name="notifications" size={scale(24)} color={isDark?"white  ":'#64656a'} />

  const openModal = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };






  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const storedTasks = await AsyncStorage.getItem('tasks');
        const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
        if (parsedTasks !== null) {
          console.log("taskiedatsdfghjdfhj", parsedTasks)
          setTrack(parsedTasks)
          // setInProgressTasks(parsedTasks.filter(task=>task.status==="In-progress"))

        } else {
          setTrack([]);
        }


      };
      fetchTasks();
    }, [])
  );

  const filteredTasks = track.filter((task) => {
    if (selected === 'All') return true;
    if (selected === 'Completed') return task.status === 'Completed';
    if (selected === 'In Progress') return task.status === 'In-progress';
    return true;
  });


  const filterprogress = track.filter(task => task.status == "In-progress")
  const completed = track.filter(task => task.status === 'Completed');
  console.log("filetered", filterprogress)
  console.log("filetered", completed)


  console.log("trackeddata=========>", track)


  const goingback = () => {
    navigation.goBack()
  }
  const handlecompleteprogress = (id) => {
    const updated = track.map(task =>
      task.id === id
        ? {
          ...task,
          status: "Completed", // capitalized to match your filter condition
          isCompleted: true,
          progress: 100, // optional: assuming 100% if completed
        }
        : task
    );

    setTrack(updated); // 🟢 updates UI
    AsyncStorage.setItem("tasks", JSON.stringify(updated));
    closeModal() // 🟢 saves changes
  };


  const handldelete = (id) => {
    const updated = track.filter(task => task.id !== id);
    setTrack(updated);
    AsyncStorage.setItem("tasks", JSON.stringify(updated)); // optional: save updated data
  };

  console.log("tracfdghjs", track)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:isDark?"black":colors.background, padding: scale(25) }}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={goingback}>
          <Text>{tick}</Text>
        </TouchableOpacity>
<Text
  style={{
    fontFamily: "Inter-Regular",
    fontWeight: "700", // or use font variant like Inter-Bold if loaded
    fontSize: moderateScale(17),
    color: isDark?"white":colors.textcolor,
  }}
>
  Today's Task
</Text>
        <Text>{notification}</Text>
      </View>
      <Dateslider />

      <View style={{ paddingVertical: verticalScale(10) }}>
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
                  fontFamily: "Inter-Regular"
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>



      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Cards task={item} onDelete={handldelete} openModal={openModal} />
        )}
        ListEmptyComponent={() => (
          <Text style={[styles.noTaskText ,{color:isDark?"white":colors.textcolor}]}>No tasks available</Text>
        )}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
      />
      {selectedTask && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity onPress={() => closeModal()} style={styles.modalOverlay}>
<View
  style={{
    backgroundColor: "white",
    height: verticalScale(250),       // vertical height
    width: "90%",                     // keep width as % (responsive)
    padding: scale(20),               // scale for padding
    justifyContent: "center",
    gap: verticalScale(20),           // scale vertical gap
    borderRadius: scale(16),          // optional: rounded corners
  }}
>
              <Text style={{ textAlign: "center", fontSize: moderateScale(16) }}>Have you completed your task</Text>
              <Text style={{ textAlign: "center", fontSize: moderateScale(20) }}>{selectedTask.value}</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <TouchableOpacity onPress={() => handlecompleteprogress(selectedTask?.id)} style={{ backgroundColor: "green", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 7 }}>
                  <Text style={{ color: colors.Whitebtn }}>yes
                  </Text>
                </TouchableOpacity>
<TouchableOpacity
  onPress={closeModal}
  style={{
    backgroundColor: "red",
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(7),
  }}
>
                  <Text style={{ color: colors.Whitebtn }}>No
                  </Text>
                </TouchableOpacity>


              </View>
            </View>

          </TouchableOpacity>
        </Modal>
      )}





    </SafeAreaView>

  )
}

export default Track

  const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  tab: {
    paddingHorizontal: scale(27),
    paddingVertical: verticalScale(8),
    borderRadius: scale(9),
    marginRight: scale(10),
    marginTop: verticalScale(10),
    borderColor: "#8766e9",
    borderWidth: 0.1,
  },
  card: {
    width: "100%",
    backgroundColor: '#ffffff',
    borderRadius: scale(20),
    padding: scale(20),
    marginRight: scale(16),
    marginTop: verticalScale(10),
    borderColor: "#7e7a8a",
    borderWidth: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: moderateScale(10),
    color: '#7e7a8a',
    fontFamily: "Inter_Regular",
  },
  star: {
    fontSize: moderateScale(13),
    backgroundColor: "#ffe4f2",
    padding: scale(5),
    borderRadius: scale(6),
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: '#0b0c0c',
    fontWeight: '600',
  },
  progress: {
    height: verticalScale(8),
    borderRadius: scale(4),
    backgroundColor: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    borderRadius: scale(30),
  },noTaskText:{
    fontSize:20,
       marginLeft: scale(16),
    marginTop: verticalScale(30),

  }
});
