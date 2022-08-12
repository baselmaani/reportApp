import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeNavs from './HomeNavs';
import NewsNavs from './NewsNavs';
import EventsNavs from './EventsNavs';
import ProfileNavs from './ProfileNavs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const Tab = createMaterialBottomTabNavigator();

export default function TabsNavs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#f0f0f0',
        showLabel: true,
      }}
      activeColor='#fff'
    >
      <Tab.Screen
        name='HomeNavs'
        component={HomeNavs}
        options={{
          tabBarLabel: 'Hem',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='report-problem' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='NewsNavs'
        component={NewsNavs}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='newspaper-o' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='EventsNavs'
        component={EventsNavs}
        options={{
          tabBarLabel: 'Händelser',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='event-available' color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='profileNavs'
        component={ProfileNavs}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  storeTab: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
