import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import FeedItem from '../news/FeedItem';
import EventItem from './EventItem';
import Layout from '../../shared/layout/Layout';
import LoadingView from '../../shared/loading/LoadingView';
import { Provider } from 'react-native-paper';
const Events = () => {
  const { currentLocation } = useCurrentLocation();

  const { data, status, loadMore } = useEvents({
    lat: currentLocation?.latitude,
    lng: currentLocation.longitude,
  });
  if (status === 'loading') return <LoadingView />;
  console.log('new data -----------------------');
  console.log(data?.pages);
  return (
    <Layout>
      <Provider>
        <View>
          <View style={styles.container}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={({ item }) => item?.id}
              data={data?.pages.map((page) => page.data).flat()}
              renderItem={({ item }) => <EventItem event={item} />}
              onEndReachedThreshold={0.4}
              onEndReached={loadMore}
            />
          </View>
        </View>
      </Provider>
    </Layout>
  );
};

export default Events;

const styles = StyleSheet.create({});
