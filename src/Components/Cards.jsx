import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

const Cards = ({ task, onDelete, openModal }) => {
  const title = task?.title || "";
  const value = task?.value || "";
  const time = task?.startDate || "";
  const status = task?.status || "";

  return (
    <TouchableOpacity style={styles.card} onPress={() => openModal(task)}>
      <View style={styles.cardLeft}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{value}</Text>
        <Text style={styles.timeText}>
          <Ionicons name="time" size={13} color="#ab94ff" />{" "}
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Text>
      </View>

      <View style={styles.cardRight}>
        <TouchableOpacity style={styles.trashIcon} onPress={() => onDelete(task.id)}>
          <Ionicons name="trash" size={13} color="#f478b8" />
        </TouchableOpacity>

        <View style={styles.statusBadge}>
          <Text
            style={styles.statusText}
            // numberOfLines={1}
            // ellipsizeMode="tail"
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    padding: scale(20),
    backgroundColor: '#ffffff',
    borderRadius: scale(20),
    marginTop: verticalScale(10),
    borderColor: "#7e7a8a",
    borderWidth: scale(0.2),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeft: {
    width: "70%",
    gap: verticalScale(10),
  },
  cardRight: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: moderateScale(12),
    color: '#7e7a8a',
    fontFamily: "Inter_Regular",
  },
  subtitle: {
    fontSize: moderateScale(14),
    marginRight: scale(10),
    color: '#0b0c0c',
    fontWeight: '600',
  },
  timeText: {
    fontSize: moderateScale(12),
    color: '#ab94ff',
  },
  trashIcon: {
    backgroundColor: "#ffe4f2",
    padding: scale(6),
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
    alignSelf:"center",
    marginLeft:scale(40)
  },
  statusBadge: {
    backgroundColor: "#e6e6fa",
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    borderRadius: scale(8),
    marginTop: verticalScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    minWidth: scale(80),
  },
  statusText: {
    fontSize: moderateScale(10),
    color: "#5c4db1",
    fontWeight: '500',
    textAlign: "center",
    includeFontPadding: false,
  },
});
