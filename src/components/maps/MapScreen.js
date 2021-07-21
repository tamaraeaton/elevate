import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
  MAP_TYPES,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

let location = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      userLat: 0,
      userLong: 0,
      userElevation: null,
      desElevation: null,
      markerLat: 0,
      markerLon: 0,
      marker: null,
    };
    this.fetchUserElevation = this.fetchUserElevation.bind(this);
    this.fetchMarkerElevation = this.fetchMarkerElevation.bind(this);
  }

  async fetchMarkerElevation() {
    let location = this.state.markerLat + ',' + this.state.markerLon;
    return await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${location}&key=AIzaSyBzwGuLqOzIr4UaZGXj1YqTmEoL1hdPk6s`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.results[0].elevation),
          this.setState({
            isLoading: false,
            desElevation: responseJson.results[0].elevation,
          });
        Alert.alert(
          'The Marker Elevation is ' +
            responseJson.results[0].elevation +
            ' meters!',
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  getUserPosition() {
    this.locationWatchId = Geolocation.watchPosition(
      pos => {
        console.log(pos);
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          userLat: pos.coords.latitude,
          userLon: pos.coords.longitude,
        });
      },
      err => console.warn(err),
      {
        enableHighAccuracy: true,
      },
    );
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.locationWatchId);
  }

  // async fetchUserElevation() {
  //   location = this.state.userLat + ',' + this.state.userLon;
  //   return await fetch(
  //     `https://maps.googleapis.com/maps/api/elevation/json?locations=${location}&key=AIzaSyBzwGuLqOzIr4UaZGXj1YqTmEoL1hdPk6s`,
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log(responseJson.results[0].elevation);
  //       if (responseJson.status === 'OK') {
  //         console.log(responseJson.results[0].elevation);
  //         this.setState({userElevation: responseJson.results[0].elevation});
  //         Alert.alert(
  //           'Your current Elevation is ' +
  //             responseJson.results[0].elevation +
  //             ' meters!',
  //         );
  //       } else {
  //         console.log(responseJson.status);
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  async componentDidMount() {
    this.getUserPosition();
  }
  _getElevationDifference() {
    let elevationOne = this.state.userElevation;
    let elevationTwo = this.state.desElevation;
    let difference = elevationOne - elevationTwo;
    console.log(difference);
    if (difference != 0) {
      this.setState({
        elevationDifference: difference,
      });
      Alert.alert('The elevation Difference is ' + difference + ' meters!');
    } else {
      this.setState({
        elevationDifference: 0,
      });
    }
    console.log(this.state.elevationDifference);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blueTitle}>ELEVATE</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          mapType={'terrain'}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          userLocationPriority={'high'}
          userLocationCalloutEnabled={true}
          loadingIndicatorColor={'red'}
          userLocationCalloutEnabled={true}
          minZoomLevel={3}
          maxZoomLevel={15}
          loadingEnabled={true}
          loadingBackgroundColor={'blue'}
          showsCompass={true}
          onPress={e =>
            this.setState({
              markerLat: e.nativeEvent.coordinate.latitude,
              markerLon: e.nativeEvent.coordinate.longitude,
              marker: e.nativeEvent.coordinate,
            })
          }>
          <MapView.Marker
            onPress={() => this.fetchUserElevation()}
            key={key}
            coordinate={{
              latitude: this.state.userLat,
              longitude: this.state.userLon,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
            <Callout tooltip onPress={this.fetchUserElevation()}>
              <Text>Lat: {this.state.userLat}</Text>
              <Text>lon: {this.state.userLong}</Text>
            </Callout>
          </MapView.Marker>
          {this.state.marker && (
            <Marker
              id={2}
              // onMarkerSelect={this.fetchMarkerElevation()}
              coordinate={{
                latitude: this.state.markerLat,
                longitude: this.state.markerLon,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
              }}
              pinColor={'gold'}>
              <Callout tooltip onPress={this.fetchMarkerlevation()}>
                <Text>Lat: {this.state.markerLat}</Text>
                <Text>lon: {this.state.markerLon}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
        <TouchableOpacity
          onPress={() => this._getElevationDifference()}
          style={[styles.bubble, styles.button]}>
          <Text style={styles.buttonText}>Get Elevation Difference</Text>
        </TouchableOpacity>
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
  buttonText: {
    textAlign: 'center',
  },
  blueTitle: {
    color: 'aqua',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 120,
    height: 35,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  elevateButtonSection: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
