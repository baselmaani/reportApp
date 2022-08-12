import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { distance } from '../../helpers/helper';

const ReportListItem = ({
  item,
  currentLocation,
  horizontal = false,
  onPress,
}) => {
  const imageUri =
    item && item.images && item.images.length > 0
      ? { uri: item.images[0] }
      : { uri: '' };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={horizontal ? styles.horizontalContainer : styles.container}
    >
      <View>
        <Image source={imageUri} style={styles.imageStyle} />
      </View>
      <View style={styles.infoContent}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleStyle}>
          {item?.title}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          style={styles.descriptionStyle}
        >
          {item?.description}
        </Text>
        <Text style={styles.descriptionStyle}>
          {`${distance(
            item.latitude,
            item.longitude,
            currentLocation.latitude,
            currentLocation.longitude
          )} Km`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReportListItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#3c3c3c50',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    margin: 10,
    width: 300,
    borderWidth: 1,
    borderColor: '#3c3c3c50',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  infoContent: {
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 14,
    color: '#333',
    margin: 2,
  },
  descriptionStyle: {
    color: '#3c3c3c50',
    padding: 2,
  },
});
