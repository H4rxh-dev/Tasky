import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native-paper';

const Cards = ({task,onDelete,openModal}) => {
   
    console.log("dgashjdgjfvsdvghhhhhhj11",task)
 const title = task?.title || "";
  const value = task?.value || "";
  const time = task?.startDate || "";
  const status = task?.status || "";


    const delet=<Ionicons name="trash" size={13} color={"#f478b8"} />   

const timeIcon =<Ionicons name="time" size={13} color={"#ab94ff"} />








    return (
<TouchableOpacity style={styles.card} onPress={() => openModal(task)}>
  <View style={styles.cardLeft}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{value}</Text>
    <Text style={styles.timeText}>
      <Ionicons name="time" size={13} color={"#ab94ff"} />{" "}
      {new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </Text>
  </View>

  <View style={styles.cardRight}>
    <TouchableOpacity style={styles.trashIcon} onPress={() => onDelete(task.id)}>
      <Ionicons name="trash" size={13} color={"#f478b8"} />
    </TouchableOpacity>
    <View style={styles.statusBadge}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  </View>
</TouchableOpacity>








  )
}

export default Cards
const styles = StyleSheet.create({
  card: {
padding:20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderColor: "#7e7a8a",
    borderWidth: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeft: {
    width: "75%",
    gap: 10,
  },
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    color: '#7e7a8a',
    fontFamily: "Inter_Regular",
  },
  subtitle: {
    fontSize: 14,
    marginRight:20,
    color: '#0b0c0c',
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#ab94ff',
  },
  trashIcon: {
    backgroundColor: "#ffe4f2",
    padding: 6,
    borderRadius: 10,
    marginBottom: 10,
    marginRight:20
  },
  statusBadge: {
    backgroundColor: "#e6e6fa",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 5,
  },
  statusText: {
    fontSize: 11,
    color: "#5c4db1",
    fontWeight: '500',
  },
});
