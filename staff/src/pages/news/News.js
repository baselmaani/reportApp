import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useFeeds } from '../../hooks/useFeeds';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import Layout from '../../shared/layout/Layout';
import ReportDetails from '../home/ReportDetails';
import FeedItem from './FeedItem';
import LoadingView from '../../shared/loading/LoadingView';

const News = () => {
  const { currentLocation } = useCurrentLocation();
  const { data, isLoading, loadMore, status } = useFeeds({
    lat: currentLocation?.latitude,
    lng: currentLocation.longitude,
  });
  if (isLoading || status === 'loading') return <LoadingView />;
  return (
    <Layout>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={data?.pages.map((page) => page.data).flat()}
          renderItem={({ item }) => <FeedItem feed={item} />}
          onEndReachedThreshold={0.04}
          onEndReached={loadMore}
        />
      </View>
    </Layout>
  );
};

export default News;

const styles = StyleSheet.create({});
