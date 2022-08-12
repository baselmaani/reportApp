import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={'#03A9F4'} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
