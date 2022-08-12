import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = ({
  title,
  onPress,
  mode = 'contained',
  style = {},
  ...props
}) => {
  return (
    <Button
      onPress={onPress}
      mode={mode}
      style={{ ...styles.btn, ...style }}
      {...props}
    >
      {title}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    padding: 10,
  },
});
