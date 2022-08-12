import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { useEffect } from 'react';
import { IconButton } from 'react-native-paper';

const CameraView = ({ onTake = () => {}, onClose }) => {
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        // start the camera
        //   setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
    })();
  }, []);

  const onTakePhoto = async () => {
    const options = { quality: 0.7, base64: true };
    const data = await camera.current.takePictureAsync(options);
    const source = data.base64;
    console.log('source');
    console.log(source);
    if (source) {
      await camera.current.pausePreview();
      onTake(source);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={camera} style={styles.camera}>
        <View style={styles.xContainer}>
          <IconButton
            icon='close'
            color={'#f0f0f0'}
            size={40}
            onPress={onClose}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon='camera'
            color={'red'}
            size={40}
            onPress={onTakePhoto}
          />
        </View>
      </Camera>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
  },
  xContainer: {
    top: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
