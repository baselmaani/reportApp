import { StyleSheet, View, FlatList, Image } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

const ImageItem = ({ item, onRemoveImage }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: `data:image/png;base64,${item}` }}
        style={styles.image}
      />
      <View style={styles.xContainer}>
        <IconButton
          icon={'close'}
          onPress={onRemoveImage}
          color='#fff'
          size={20}
          style={styles.iconStyle}
        />
      </View>
    </View>
  );
};

const ImagesList = ({ images, onRemoveImage }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listStyle}
        data={images}
        keyExtractor={({ item }) => item}
        horizontal={true}
        renderItem={({ item }) => (
          <ImageItem item={item} onRemoveImage={() => onRemoveImage(item)} />
        )}
      />
    </View>
  );
};

export default ImagesList;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
  },
  imageContainer: {
    padding: 20,
  },
  xContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  listStyle: {
    paddingTop: 20,
    width: '100%',
  },
  iconStyle: {
    backgroundColor: 'red',
  },
});
