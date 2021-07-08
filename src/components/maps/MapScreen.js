import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: 0,
      userLon: 0,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
      desLat: 0,
      desLon: 0,
      userLocation: 0,
      eleCoord: 0,
      desEle: 0,
      marker: null,
      eleDiff: 0,
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos),
          this.setState({
            userLat: pos.coords.latitude,
            userLon: pos.coords.longitude,
            userLocation: pos,
          });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
        fastestInterval: 5000,
      },
    );
  }

  render() {
    const {userLat, userLon, desLat, desLon} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.blueTitle}>ELEVATE</Text>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          provider={'google'}
          mapType="standard"
          region={{
            latitude: userLat,
            longitude: userLon,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'gold',
  },
  map: {
    height: 600,
    width: 600,
  },

  blueTitle: {
    color: 'navy',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    height: 30,
    backgroundColor: 'gold',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
  },
  elevateButtonSection: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
