import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Progress = ({ openModal,Item,isEmpty}) => {
console.log("Routedata",Item)

console.log("RoutedataID",Item?.id)
const opening = () => {
  if (Item?.id) {
    openModal(Item?.id); // ✅ Fix applied
    console.log("Passing ID:", Item?.id);
  } else {
    console.warn("Item or Item.id is undefined");
  }
};

if (isEmpty) {
    return (    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Add task</Text>
        <TouchableOpacity onPress={opening} style={styles.iconWrapper}>
          <Ionicons name="trash" size={16} color="#f478b8" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 2 }}>
        <Text style={styles.subtitle}>Create and update task to see here</Text>
        <ProgressBar
          progress={0}
          color="#0087ff"
          style={styles.progress}
        />
      </View>
    </View>




    );
  }



  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{Item?.value}</Text>
        <TouchableOpacity onPress={opening} style={styles.iconWrapper}>
          <Ionicons name="trash" size={16} color="#f478b8" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 2 }}>
        <Text style={styles.subtitle}>{Item?.desc}</Text>
        <ProgressBar
          progress={0.6}
          color="#0087ff"
          style={styles.progress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.65,
    backgroundColor: '#e7f3ff',
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    marginTop: 10,
    // Removed shadow-related properties
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#9495a5',
  },
  iconWrapper: {
    backgroundColor: "#ffe4f2",
    borderRadius: 6,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#0b0c0c',
    marginBottom: 12,
    fontWeight: '600',  // Use string '600'
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
});

export default Progress;
