import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import News from '../pages/news/News';

const stackNav = createStackNavigator();
const NewsNavs = () => {
  return (
    <stackNav.Navigator options={{ headerShown: false }}>
      <stackNav.Screen
        name='News'
        component={News}
        options={{ headerShown: false }}
      />
    </stackNav.Navigator>
  );
};

export default NewsNavs;
