import { StyleSheet, Text, View, TouchableOpacity,TextInput, Alert } from 'react-native';
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

      <View style={styles.form}>
        <View style={[styles.dropdownWrapper, { marginBottom: open ? 100 : 10 }]}>
          <View style={styles.dropdownIcon}>
            <Ionicons name="bag-sharp" size={16} color={"#f47cba"} />
          </View>
          <DropDownPicker
            open={open}
            value={value}
            items={filtertaskitem}
            setOpen={setOpen}
            setValue={setValue}
            setItems={() => {}}
            placeholder="Task Group"
            style={styles.dropdown}
            zIndex={3000}
            ArrowDownIconComponent={({ style }) => (
              <Icon name="caret-down" size={20} color="#000" style={style} />
            )}
            ArrowUpIconComponent={({ style }) => (
              <Icon name="caret-up" size={20} color="#000" style={style} />
            )}
            onChangeValue={(val) => {
              const selectedTask = taskSuggestions.find(task => task.value === val);
              console.log("Selected Task Label:", selectedTask?.label);
              console.log("Selected Task Value:", val);
            }}
          />
        </View>

<View style={{ backgroundColor:colors.textfield,padding: 10 }}>
  <Text style={{fontSize: 10, paddingInlineStart: 10, color: "#8d8b98" }}>Title</Text>
  <TextInput
    style={{ paddingInlineStart: 10, color: '#000' }}  // <-- added color
    placeholder="Enter title"
    placeholderTextColor="#000"
    value={title}
    onChangeText={settitle}
  />
</View>

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
      paddingInlineStart: 10,
      paddingTop: 10,
      fontSize: 14,
      height: 80,
      color: '#000'  // <-- added color for input text
    }}
    placeholderTextColor="#000"
    value={desc}
    onChangeText={setdesc}
  />
</View>

        {/* Start Date Row */}
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
 minimumDate={new Date()}  // Start date can't be before today
          onConfirm={(date) => {
            setOpenStart(false);
            setStartDate(date);

            // If endDate is before new startDate, update endDate to match startDate
            if (date > endDate) {
              setEndDate(date);
            }
          }}          onCancel={() => setOpenStart(false)}
        /> 
        
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
 minimumDate={startDate} // End date can't be before startDate
          onConfirm={(date) => {
            setOpenEnd(false);
            setEndDate(date);
          }}
          onCancel={() => setOpenEnd(false)}          
        />

        <TouchableOpacity onPress={savingtask} style={styles.btn}>
          <Text style={styles.txt}>Add project</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 25,
    paddingTop: 10,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: "Inter-Regular",
    fontWeight: '700',
    fontSize: 17,
    color: colors.textcolor,
  },
  form: {
    gap: 20,
  },
  dropdownWrapper: {
    position: 'relative',
  },
  dropdownIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    backgroundColor: "#ffe4f2",
    padding: 6,
    borderRadius: 6,
    transform: [{ translateY: -12 }],
    zIndex: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 23,
  },
  dropdown: {
    borderColor: "#c8c7ce",
    paddingVertical: 12,
    paddingLeft: 60,
    backgroundColor: "#ffffff",
  },
  input: {
    backgroundColor: colors.textfield,
    borderColor: "#c8c7ce",
    borderWidth: 0.3,
  },
  inputWrapper: {
    position: 'relative',
  },
  insideLabel: {
    position: 'absolute',
    top: 8,
    left: 16,
    fontSize: 12,
    color: '#6e6e6e',
    zIndex: 10,
    backgroundColor: colors.textfield,
    paddingHorizontal: 4,
  },
  textArea: {
    backgroundColor: colors.textfield,
    borderColor: "#c8c7ce",
    borderWidth: 0.3,
    height: 120,
    borderRadius: 8,
    fontSize: 14,
    paddingTop: 32,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 11,
    color: '#93909d',
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.textfield,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  dategap: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

btn: {
  backgroundColor: colors.btncolor,
  paddingVertical: 15,      // vertical padding for height
  paddingHorizontal: 20,    // horizontal padding for width
  borderRadius: 15,         // rounded corners
marginTop:70,
  alignSelf: 'stretch',     // button takes full width of container
  justifyContent: 'center',
  alignItems: 'center',
},

txt: {
  textAlign: "center",
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},
});
