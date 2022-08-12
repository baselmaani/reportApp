import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/auth/Login';
import Home from '../pages/home/Home';
import Signup from '../pages/auth/Signup';
import { useStateValue } from '../providers/StateContext';
import Auth from '../pages/auth/Auth';
import HomeNavs from './HomeNavs';
import TabsNavs from './TabsNav';

const RootNav = createStackNavigator();

export default function Root() {
  const [{ user }] = useStateValue();

  return (
    <NavigationContainer>
      <RootNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user === null ? <RootNav.Screen name='auth' component={Auth} /> : null}
        <RootNav.Screen name='TabsNavs' component={TabsNavs} />
      </RootNav.Navigator>
    </NavigationContainer>
  );
}
