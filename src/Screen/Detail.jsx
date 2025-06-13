import { StyleSheet, Text, View, TouchableOpacity,TextInput, Alert,ScrollView,KeyboardAvoidingView,Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/color';
import { taskSuggestions } from '../Trackdata';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScaledSheet, moderateScale, scale, verticalScale } from 'react-native-size-matters';


const tick = <Ionicons name="arrow-back-outline" size={25} color={colors.textcolor} />;
const notification = <Ionicons name="notifications" size={20} color={colors.textcolor} />;

const Detail = ({ navigation }) => {
  const id = uuid.v4(); 
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [Item, setItem] = useState([]);
  const [status, setStatus] = useState('In-progress'); // or 'InProgress', 'Completed'

const [filtertaskitem, setFilterTaskItem] = useState([]);



  const goingback = () => {
    navigation.goBack();



  };
  
useEffect(() => {
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
      setItem(parsedTasks);
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  loadTasks();
}, []);



useEffect(() => {



  const filtered = taskSuggestions.filter(
    taskss => !Item.some(selected => selected.value === taskss.value)
  );
  console.log("filtered=============>",filtered)
  setFilterTaskItem(filtered);
}, [Item, taskSuggestions]); // run effect when Item or taskSuggestions change





const savingtask = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    const parsedTasks = storedTasks != null ? JSON.parse(storedTasks) : [];




    const newTask = {
      id,
      title,
      desc,
      status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      value,
      progress: 0,
      isCompleted: false
    };

if(!title || !desc || !value) return Alert.alert("pleasee add title and desc first")

    const updatedTasks = [...parsedTasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setItem(updatedTasks)


    

    console.log("✅ Task Saved:", newTask);
// console.log(updatedTasks)

    // 🔄 Reset all fields
settitle("")
setdesc("")
 setValue(null);
    navigation.goBack();

  } catch (error) {
    console.log("❌ Error saving task:", error);
  }
};

  




console.log("Itemsssssssssss=>",Item)



const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };


  return (
 <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goingback}>
          <Text>{tick}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Project</Text>
        <Text>{notification}</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true} // ✅ add this
>
          {/* DropDown Picker */}
          <View style={[styles.dropdownWrapper, { marginBottom: open ? 120 : 20 }]}>
            <View style={styles.dropdownIcon}>
              <Ionicons name="bag-sharp" size={16} color={"#f47cba"} />
            </View>
            <View style={{ zIndex: open ? 2000 : 1 }}>

            <DropDownPicker
              open={open}
              value={value}
              items={filtertaskitem}
              setOpen={setOpen}
              setValue={setValue}
              setItems={() => {}}
              placeholder="Task Group"
              style={styles.dropdown}
              zIndex={4000}
              zIndexInverse={1000}
listMode="SCROLLVIEW"
  nestedScrollEnabled={true} // ✅
ArrowDownIconComponent={({ style }) => (
                <Icon name="caret-down" size={20} color="#000" style={style} />
              )}
              ArrowUpIconComponent={({ style }) => (
                <Icon name="caret-up" size={20} color="#000" style={style} />
              )}
              onChangeValue={(val) => {
                const selectedTask = taskSuggestions.find(task => task.value === val);
                console.log("Selected Task Label:", selectedTask?.label);
              }}
            />
          </View>
          </View>

          {/* Title */}
          <View style={{ backgroundColor: colors.textfield, padding: 10 }}>
            <Text style={{ fontSize: 10, paddingInlineStart: 10, color: "#8d8b98" }}>Title</Text>
            <TextInput
              style={{ paddingInlineStart: 10, color: '#000' }}
              placeholder="Enter title"
              placeholderTextColor="#000"
              value={title}
              onChangeText={settitle}
            />
          </View>

          {/* Description */}
          <View style={{ backgroundColor: colors.textfield, padding: 10, borderRadius: 8 }}>
            <Text style={{ fontSize: 10, paddingInlineStart: 10, color: "#8d8b98", marginBottom: 6 }}>
              Description
            </Text>
            <TextInput
              placeholder="Write here..."
              multiline
              numberOfLines={5}
              textAlignVertical="top"
style={{
  paddingLeft: scale(10),
  paddingTop: verticalScale(10),
  fontSize: scale(14),
  color: '#000',
}}
              placeholderTextColor="#000"
              value={desc}
              onChangeText={setdesc}
            />
          </View>

          {/* Start Date */}
          <TouchableOpacity style={styles.dateRow} onPress={() => setOpenStart(true)}>
            <View style={styles.dategap}>
              <Icon name="calendar" size={20} color="#8361e7" />
              <View>
                <Text style={styles.label}>Start Date</Text>
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              </View>
            </View>
            <Icon name="caret-down" size={20} color="#8361e7" />
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={openStart}
            date={startDate}
            minimumDate={new Date()}
            onConfirm={(date) => {
              setOpenStart(false);
              setStartDate(date);
              if (date > endDate) setEndDate(date);
            }}
            onCancel={() => setOpenStart(false)}
          />

          {/* End Date */}
          <TouchableOpacity style={styles.dateRow} onPress={() => setOpenEnd(true)}>
            <View style={styles.dategap}>
              <Icon name="calendar" size={20} color="#8361e7" />
              <View>
                <Text style={styles.label}>End Date</Text>
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              </View>
            </View>
            <Icon name="caret-down" size={20} color="#8361e7" />
          </TouchableOpacity>

          <DatePicker
            modal
            mode="date"
            open={openEnd}
            date={endDate}
            minimumDate={startDate}
            onConfirm={(date) => {
              setOpenEnd(false);
              setEndDate(date);
            }}
            onCancel={() => setOpenEnd(false)}
          />

          {/* Submit Button */}
          <TouchableOpacity onPress={savingtask} style={styles.btn}>
            <Text style={styles.txt}>Add project</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Detail;
const styles = ScaledSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: scale(25),
    paddingTop: verticalScale(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontFamily: "Inter-Regular",
    fontWeight: '700',
    fontSize: scale(17),
    color: colors.textcolor,
  },
  form: {
    gap: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 3000,
  },
  dropdownIcon: {
    position: 'absolute',
    left: scale(12),
    top: '50%',
    backgroundColor: "#ffe4f2",
    padding: scale(6),
    borderRadius: scale(6),
    transform: [{ translateY: -12 }],
    zIndex: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(24),
    height: scale(23),
  },
  dropdown: {
    borderColor: "#c8c7ce",
    paddingVertical: verticalScale(12),
    paddingLeft: scale(60),
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: scale(11),
    color: '#93909d',
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.textfield,
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    borderRadius: scale(8),
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  dateText: {
    fontSize: scale(14),
    color: '#000',
  },
  dategap: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(20),
  },
  btn: {
    backgroundColor: colors.btncolor,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(20),
    borderRadius: scale(15),
    marginTop: verticalScale(20),
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: scale(16),
    fontWeight: "700",
  },
});