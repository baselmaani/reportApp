import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

const Layout = ({ children, goBack, isAbsolute = true }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={isAbsolute ? styles.absoluteHeader : styles.header}>
        <View>
          {goBack && (
            <IconButton
              onPress={goBack}
              icon='chevron-left'
              size={40}
              color='#fff'
              animated={true}
              style={styles.backContainer}
            />
          )}
        </View>
        <View>
          <IconButton icon={'bell'} />
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
  },
  absoluteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    top: 40,
    zIndex: 9999,
    position: 'absolute',
  },
  imageStyle: {
    width: 60,
    height: 60,
  },
  backContainer: {
    backgroundColor: '#333',
  },
});
