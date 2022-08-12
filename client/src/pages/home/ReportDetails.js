import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useAddReaction } from '../../hooks/useAddReaction';
import openMap from 'react-native-open-maps';

const ReportDetails = ({ report, currentLocation }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const addReactionMutation = useAddReaction();

  const onChangeSlider = (val) => {
    addReactionMutation.mutate({
      value: val,
      reportId: report.id,
    });
    setSliderValue(val);
  };

  useEffect(() => {
    if (report && report.reportReactions && report.reportReactions.length > 0) {
      setSliderValue(report.reportReactions[0].value);
    }
  }, [report]);

  return (
    <Card style={styles.cardStyle}>
      <View style={styles.mapLink}>
        <IconButton
          icon={'google-maps'}
          color='#2196F3'
          size={30}
          onPress={() =>
            openMap({
              latitude: parseFloat(currentLocation?.latitude),
              longitude: parseFloat(currentLocation?.longitude),
              end: `${report?.latitude},${report?.longitude}`,
              navigate_mode: 'navigate',
              provider: 'google',
            })
          }
        />
      </View>
      <Text style={styles.title}>{report?.title}</Text>
      <Text style={styles.description}>{report?.description}</Text>
      <View style={styles.imagesContainer}>
        <FlatList
          data={report?.images}
          keyExtractor={({ item }) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageItem} />
          )}
        />
      </View>
      <View>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={-1}
          maximumValue={1}
          minimumTrackTintColor='#0f0'
          maximumTrackTintColor='#f00'
          value={sliderValue}
          onSlidingComplete={onChangeSlider}
        />
      </View>
    </Card>
  );
};

export default ReportDetails;

const styles = StyleSheet.create({
  imageItem: {
    width: 300,
    height: 200,
    margin: 10,
  },
  cardStyle: {
    margin: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  description: {
    color: '#3c3c3c70',
  },
  imagesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  mapLink: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 99,
  },
});
