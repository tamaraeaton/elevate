import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default MapScreen = () => (
  <View style={styles.container}>
    <MapView
      showsUserLocation
      followsUserLocation
      style={styles.map}
      region={{
        latitude: 41.2816,
        longitude: -111.5116,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
