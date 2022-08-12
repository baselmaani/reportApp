import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [initRegion, setInitRegion] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        distanceInterval: 1000,
      });
      setCurrentLocation(location?.coords);
      setInitRegion(location);
    })();
  }, []);

  return { currentLocation, initRegion };
};
