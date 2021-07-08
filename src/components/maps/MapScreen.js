import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MAP_TYPES,
  Callout,
} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: '',
        longitude: '',
        latitudeDelta: '',
        longitudeDelta: '',
        accuracy: '',
      },
      marker: null,
      userLocation: [],
      markerLat: 0,
      markerLon: 0,
    };
  }

  calDelta(lat, long, accuracy) {
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
    const longDelta =
      accuracy /
      (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

    this.setState({
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
        accuracy: accuracy,
      },
    });
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos),
          this.setState({
            userLat: pos.coords.latitude,
            userLong: pos.coords.longitude,
            userLocation: [pos.coords.latitude, pos.coords.longitude],
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
        fastestInterval: 5000,
        showsBackgroundLocationIndicator: true,
        showLocationDialog: true,
      },
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
          provider={PROVIDER_GOOGLE}
          scrollDuringRotateOrZoomEnabled={false}
          zoomControlEnabled={true}
          showsCompass={true}
          zoomEnabled={true}
          mapType="terrain"
          region={{
            latitude: this.state.userLatitude,
            longitude: this.state.userLongitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
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
              <Text>Lat: {this.state.userLatitude}</Text>
              <Text>lon: {this.state.userLongitude}</Text>
              <Text>Elevation:{this.state.userElevation}</Text>
            </Callout>
          </Marker>
          {this.state.marker && (
            <Marker coordinate={this.state.marker} pinColor={'gold'}>
              <Callout key={2}>
                <Text>Lat:{this.state.markerLat}</Text>
                <Text>lon:{this.state.markerLon}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
        {/* <View
                    style={styles.elevateButtonSection}
                >
              
                    <Button
                        title="Elevation Difference"
                        onPress={() => this._getElevationDifference,
                            Alert.alert('The Elevation Difference is ' + this.state.elevationDifference)}
                    />
                </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    width: width,
    height: height,
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     height: 600,
//     width: 600,
//   },

//   blueTitle: {
//     color: 'aqua',
//     fontWeight: 'bold',
//     fontSize: 25,
//     marginLeft: 120,
//     height: 35,
//   },
//   button: {
//     backgroundColor: 'blue',
//     color: 'white',
//   },
//   elevateButtonSection: {
//     width: '100%',
//     height: '10%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   map: {
//     width: width,
//     height: height,
//     flex: 1,
//   },

//   blueTitle: {
//     color: 'navy',
//     fontWeight: 'bold',
//     fontSize: 25,
//     textAlign: 'center',
//     marginBottom: 10,
//     height: 30,
//     backgroundColor: 'gold',
//   },
//   button: {
//     backgroundColor: 'blue',
//     color: 'white',
//   },
// elevateButtonSection: {
//   width: '100%',
//   height: '10%',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// });

// markerLat: 0,
// markerLon: 0,
// userLat: 0,
// userLong: 0,
// userElevation: 0,
// latitudeDelta: 0.1,
// longitudeDelta: 0.1,
// userLocation: [],
// eleCoordinates: 0,
// markerElevation: 0,
// marker: null,
// elevationDifference: 0,
