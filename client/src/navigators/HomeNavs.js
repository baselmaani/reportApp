import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/home/Home';
import ReportsListModel from '../pages/home/ReportsListModel';

const stackNav = createStackNavigator();
const HomeNavs = () => {
  return (
    <stackNav.Navigator options={{ headerShown: false }}>
      <stackNav.Screen
        name='home'
        component={Home}
        options={{ headerShown: false }}
      />
      <stackNav.Screen
        name='reports'
        component={ReportsListModel}
        options={{ headerShown: false }}
      />
    </stackNav.Navigator>
  );
};

export default HomeNavs;
