import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './urls';

const axiosInstance = async (method, innerUrl, toSendData) => {
  const tkn = await AsyncStorage.getItem('token');
  const instance = Axios.create({
    'Content-Type': 'application/x-www-form-urlencoded',
    baseURL: BASE_URL,
    headers: {
      Authorization: `bearer ${tkn}`,
    },
  });
  const resp = await instance({
    method: method,
    url: innerUrl,
    data: method === 'get' || method === 'delete' ? undefined : toSendData,
    params: method === 'get' || method === 'delete' ? toSendData : undefined,
  });
  return resp;
};

export default axiosInstance;
