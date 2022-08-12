import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/profile/Profile';

const stackNav = createStackNavigator();
const ProfileNavs = () => {
  return (
    <stackNav.Navigator options={{ headerShown: false }}>
      <stackNav.Screen
        name='profile'
        component={Profile}
        options={{ headerShown: false }}
      />
    </stackNav.Navigator>
  );
};

export default ProfileNavs;
