import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from './StateContext';
import jwtDecode from 'jwt-decode';

const LocalStorageContainer = ({ children }) => {
  const [{}, changeState] = useStateValue();
  useEffect(() => {
    const getToken = async () => {
      const tkn = await AsyncStorage.getItem('token');
      if (tkn && tkn !== null && tkn !== '') {
        const decoded = jwtDecode(tkn);
        if (decoded && decoded.exp * 1000 > new Date()) {
          changeState({
            type: 'SET_USER',
            payload: decoded,
          });
        }
      }
    };

    getToken();
  }, []);
  return <>{children}</>;
};

export default LocalStorageContainer;

const styles = StyleSheet.create({});
