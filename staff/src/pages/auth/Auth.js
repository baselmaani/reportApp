import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = ({ navigation }) => {
  const [currentView, setCurrentView] = useState('login');
  return (
    <ImageBackground
      style={styles.container}
      source={require('./../../../assets/waterfall.jpg')}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {currentView === 'login' && (
          <Login setCurrentView={setCurrentView} navigation={navigation} />
        )}
        {currentView === 'signup' && (
          <Signup setCurrentView={setCurrentView} navigation={navigation} />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 20,
  },
});
