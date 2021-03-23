import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class App extends React.Component {
  state = {
    coordinates: [
      { name: 1, latitude: 37.0025259, longitude: -122.4351431 },
      { name: 2, latitude: 37.7896386, longitude: -122.421646 },
      { name: 3, latitude: 37.7665428, longitude: -122.4161628 },
      { name: 4, latitude: 37.7734153, longitude: -122.4577787 },
      { name: 5, latitude: 37.7948605, longitude: -122.4596065 },
      { name: 6, latitude: 37.0025259, longitude: -122.4351431 },

    ]
  }





  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }}
      >
        <Marker
          coordinate={{ latitude: 37.0025259, longitude: -122.4351431 }}
          title={'San Francisco'}>

        </Marker>
      </MapView>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    height: '100%'
  }
})




