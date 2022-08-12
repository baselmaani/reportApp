import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Events from '../pages/Events/Events';

const stackNav = createStackNavigator();
const EventsNavs = () => {
  return (
    <stackNav.Navigator options={{ headerShown: false }}>
      <stackNav.Screen
        name='events'
        component={Events}
        options={{ headerShown: false }}
      />
    </stackNav.Navigator>
  );
};

export default EventsNavs;
