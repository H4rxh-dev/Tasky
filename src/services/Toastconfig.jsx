// toastConfig.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const toastConfig = {
  customToast: ({ text1, text2, props }) => (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={styles.toast}>
        <Text style={styles.title}>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
  },
});
