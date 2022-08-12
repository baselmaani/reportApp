import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { useNearByReports } from '../../hooks/useNearByReports';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import ReportDetails from './ReportDetails';
import Layout from '../../shared/layout/Layout';

const ReportsListModel = ({ navigation }) => {
  const { currentLocation } = useCurrentLocation();
  const { data, isLoading } = useNearByReports({
    lat: currentLocation.latitude,
    lng: currentLocation.longitude,
  });

  return (
    <Layout goBack={() => navigation.goBack()} isAbsolute={false}>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ReportDetails report={item} currentLocation={currentLocation} />
          )}
        />
      </View>
    </Layout>
  );
};

export default ReportsListModel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
});
