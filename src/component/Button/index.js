import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export const Button = ({
  label = '',
  onPress = () => {},
  buttonStyle = {},
  textStyle = {}
}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={[styles.defaultButtonStyle, buttonStyle]}
  >
    <Text style={[styles.defaultTextStyle, textStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  defaultButtonStyle: {
    width: 300,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultTextStyle: {
    color: 'black',
    fontSize: 14
  }
})