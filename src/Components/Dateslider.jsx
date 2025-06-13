import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';


const generateWeekDates = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const Dateslider = ({ onDateSelect, completedDates = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const generated = generateWeekDates(today);
    setWeekDates(generated);
    setSelectedDate(today);

    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: 0,         // today is first item
          animated: false,
          viewPosition: 0.5, // center the item horizontally
        });
      }
    }, 100);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect && onDateSelect(date.toISOString().slice(0, 10));
  };

  const getDateParts = (date) => ({
    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
    dayNum: date.getDate(),
    monthName: date.toLocaleDateString('en-US', { month: 'short' }),
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={weekDates}
        keyExtractor={(item) => item.toISOString()}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => (
          {length: 80, offset: 80 * index, index} // approximate item width + margin
        )}
        initialScrollIndex={0} // scroll to first item on load
        renderItem={({ item }) => {
          const isSelected = item.toDateString() === selectedDate.toDateString();
          const formattedDate = item.toISOString().slice(0, 10);
          const isCompleted = completedDates.includes(formattedDate);

          const { dayName, dayNum, monthName } = getDateParts(item);

          return (
            <TouchableOpacity
              onPress={() => handleDateSelect(item)}
              style={[
                styles.dayBox,
                isSelected && styles.selectedDayBox,
                isCompleted && styles.completedBox,
              ]}
            >
              <Text
                style={[
                  styles.dayLabel,
                  isSelected && styles.selectedLabel,
                  isCompleted && styles.completedLabel,
                ]}
              >
                {dayName}
              </Text>
              <Text
                style={[
                  styles.dateLabel,
                  isSelected && styles.selectedLabel,
                  isCompleted && styles.completedLabel,
                ]}
              >
                {dayNum}
              </Text>
              <Text
                style={[
                  styles.monthLabel,
                  isSelected && styles.selectedLabel,
                  isCompleted && styles.completedLabel,
                ]}
              >
                {monthName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

 const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(9),
    marginTop: verticalScale(18),
  },
  dayBox: {
    backgroundColor: '#ffffff',
    borderRadius: scale(12),
    marginHorizontal: scale(5),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    width: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayBox: {
    backgroundColor: '#9260f4',
  },
  completedBox: {
    borderColor: '#00c853',
    borderWidth: scale(2),
  },
  dayLabel: {
    fontSize: moderateScale(12),
    color: '#555',
  },
  dateLabel: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#282930',
  },
  monthLabel: {
    fontSize: moderateScale(12),
    color: '#555',
  },
  selectedLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedLabel: {
    color: '#00c853',
  },
});

export default Dateslider;
