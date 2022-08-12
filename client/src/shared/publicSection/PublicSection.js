import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';

const PublicSection = ({ value, onChange }) => {
  return (
    <View style={styles.isPublicStyle}>
      <View style={styles.titleSection}>
        <Text style={styles.publicTitle}>{value ? 'publik' : 'privat'}</Text>
        <Switch value={value} onChange={onChange} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.publicDescription}>
          {value
            ? 'din rapport kommer att visas för organisationer och andra användare'
            : 'din rapport kommer att visas för organisationer'}
        </Text>
      </View>
    </View>
  );
};

export default PublicSection;

const styles = StyleSheet.create({
  isPublicStyle: {
    borderColor: '#f0f0f0',
    padding: 10,
    borderWidth: 1,
  },
  titleSection: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  publicTitle: {
    margin: 5,
    color: '#333',
    fontSize: 16,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  publicDescription: {
    color: '#3c3c3c60',
  },
  switchContainer: {
    width: 100,
  },
});
