import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from '../providers/StateContext';
import jwtDecode from 'jwt-decode';
import Auth from '../api/Auth';

export const useLogin = () => {
  const [{}, changeState] = useStateValue();
  return useMutation(Auth.login, {
    onSuccess: async (dt) => {
      await AsyncStorage.setItem('token', dt.token);
      const decoded = jwtDecode(dt.token);

      changeState({
        type: 'SET_USER',
        payload: decoded,
      });
    },
  });
};
