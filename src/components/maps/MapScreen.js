import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLat: 0,
      userLong: 0,
      userElevation: 0,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
      markerLat: 0,
      markerLon: 0,
      marker: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos),
          this.setState({
            userLat: pos.coords.latitude,
            userLong: pos.coords.longitude,
            // userLocation: [pos.coords.latitude, pos.coords.longitude],
          });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blueTitle}>ELEVATE</Text>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          userLocationCalloutEnabled={true}
          scrollDuringRotateOrZoomEnabled={true}
          provider={'google'}
          showsCompass={true}
          mapType="terrain"
          region={{
            latitude: this.state.userLat,
            longitude: this.state.userLong,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={e =>
            this.setState({
              markerLat: e.nativeEvent.coordinate.latitude,
              markerLon: e.nativeEvent.coordinate.longitude,
              marker: e.nativeEvent.coordinate,
            })
          }>
          <Marker
            key={1}
            coordinate={{
              latitude: this.state.userLat,
              longitude: this.state.userLong,
            }}>
            <Callout>
              <Text>Lat: {this.state.userLat}</Text>
              <Text>lon: {this.state.userLong}</Text>
            </Callout>
          </Marker>
          {this.state.marker && (
            <Marker coordinate={this.state.marker} pinColor={'gold'}></Marker>
          )}
        </MapView>
        <View style={styles.elevateButtonSection}>
          <Button title="Elevation Difference" />
        </View>
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
  },
  map: {
    height: 600,
    width: 600,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  blueTitle: {
    color: 'aqua',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 120,
    height: 35,
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
