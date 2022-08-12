import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

const Map = ({
  locations = [],
  initRegion,
  showsMyLocationButton = true,
  onPressMarker,
}) => {
  return (
    <MapView
      showsMyLocationButton={showsMyLocationButton}
      initialRegion={initRegion}
      style={styles.map}
      provider='google'
      followsUserLocation={true}
    >
      {locations.map((c) => (
        <Marker
          coordinate={{
            longitude: c.longitude,
            latitude: c.latitude,
          }}
        >
          <IconButton
            onPress={() => onPressMarker(c)}
            icon='alert'
            color='red'
            size={20}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
