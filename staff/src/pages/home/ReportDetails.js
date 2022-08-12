import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useReportById } from '../../hooks/useReportById';
import ReportReactionsChart from '../../shared/charts/ReportReactionsChart';
import Layout from '../../shared/layout/Layout';
import LoadingView from '../../shared/loading/LoadingView';
import Map from './Map';
import { Button } from 'react-native-paper';
import openMap from 'react-native-open-maps';
import CategoriesList from '../../shared/categoriesList.js/CategoriesList';
import { distance } from '../../helpers/helper';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import Slider from '@react-native-community/slider';

const ReportDetails = ({ route, navigation }) => {
  const { currentLocation } = useCurrentLocation();
  const { reportId } = route.params;
  const [sliderValue, setSliderValue] = useState(0);
  const { data, isLoading } = useReportById(reportId);

  const onChangeSlider = (val) => {
    addReactionMutation.mutate({
      value: val,
      reportId: report.id,
    });
    setSliderValue(val);
  };

  if (isLoading) return <LoadingView />;
  return (
    <Layout isAbsolute={false} goBack={() => navigation.goBack()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 10 }}
      >
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.description}>{data?.description}</Text>

        <Text style={styles.distanceStyle}>
          {`${distance(
            data.latitude,
            data.longitude,
            currentLocation.latitude,
            currentLocation.longitude
          )} Km`}
        </Text>

        <CategoriesList categories={data.categories} />
        <Text
          style={styles.description}
        >{`reagerade användare ${data?.reportReactions?.length}`}</Text>
        <View style={styles.imagesContainer}>
          <FlatList
            data={data?.images}
            keyExtractor={({ item }) => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.imageItem} />
            )}
          />
        </View>

        <ReportReactionsChart reportReactions={data.reportReactions} />
        <Button
          onPress={() =>
            openMap({
              latitude: parseFloat(data?.latitude),
              longitude: parseFloat(data?.longitude),
              end: `${data?.latitude},${data?.longitude}`,
              navigate_mode: 'navigate',
              provider: 'google',
            })
          }
        >
          visa på kartan
        </Button>
        <View style={styles.mapContainer}>
          <Map
            initRegion={{
              longitude: data.longitude,
              latitude: data.latitude,
            }}
            locations={[data]}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>din bedömning</Text>
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
        <View style={styles.buttonsContainer}>
          <Button color='rgba(76, 175, 80,1.0)' mode='contained'>
            Markera som hanterad
          </Button>
        </View>
      </ScrollView>
    </Layout>
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
    padding: 10,
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
  mapContainer: {
    height: 300,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonsContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  distanceStyle: {
    marginTop: 10,
    color: '#03A9F4',
  },
  sliderContainer: {
    padding: 20,
  },
  label: {
    color: '#3c3c3c50',
  },
});
