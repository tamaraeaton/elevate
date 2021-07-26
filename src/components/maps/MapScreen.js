import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import axios from 'axios';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
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
      userLon: 0,
      userElevation: 0,
      desElevation: 0,
      elevationDifference: 0,
      markerLat: 0,
      markerLon: 0,
      marker: null,
    };
    this.userDestinationMarkerCalloutPress =
      this.userDestinationMarkerCalloutPress.bind(this);
    this.userLocationMarkerCalloutPress =
      this.userLocationMarkerCalloutPress.bind(this);
  }
  userLocationMarkerCalloutPress = async () => {
    let userCoordinates = this.state.userLat + ',' + this.state.userLon;
    let userElevationCoordinates = userCoordinates.toString();
    console.log(
      'userElevationCoordinates IS working Line 46',
      userElevationCoordinates,
    );
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyAC0rfEw46oQI8o22_X-ZSFCrIzPF-BZlk`,
      );
      const responseJson = await response.json();
      console.log('responseJson Line 52', responseJson);
      const currentElevation = responseJson.results[0].elevation;
      console.log('Line 53, currentElevation1', currentElevation);
      this.setState({userElevation: currentElevation}, () => console.log('Line 55, userElevation', this.state.userElevation));
    } catch (error) {
      console.error('Line 63 error', error);
    }
    console.log('Line 60 return this.state.userElevation', this.state.userElevation);
    return this.state.userElevation;
  };
  userDestinationMarkerCalloutPress = async () => {
    let markerCoordinates = this.state.markerLat + ',' + this.state.userLon;
    let userDestinationCoordinates = markerCoordinates.toString();
    console.log(
      'userDestinationCoordinates working Line 71',
      userDestinationCoordinates,
    );
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${userDestinationCoordinates}&key=AIzaSyAC0rfEw46oQI8o22_X-ZSFCrIzPF-BZlk`,
      );
      const responseJson = await response.json();
      const destinationElevation = responseJson.results[0].elevation;
      console.log(
        'destinationElevation working Line 78',
        responseJson.results[0].elevation,
      );
      this.setState({
        desElevation: destinationElevation,
      });
    } catch (error) {
      console.error('2', error);
    }
    console.log('return destinationElevation', this.state.desElevation)
    return this.state.desElevation;
  };
  getUserPosition() {
    this.locationWatchId = Geolocation.watchPosition(
      pos => {
        console.log('pos1', pos);
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
  componentDidMount() {
    this.getUserPosition();
  }
  getElevationDifference() {
    if (this.state.userLat && this.state.markerLat !== 0) {
      this.userLocationMarkerCalloutPress();
      this.userDestinationMarkerCalloutPress();
    }
    let difference = this.state.userElevation - this.state.desElevation;
    console.log('Line 116, difference', difference);
    if (difference != 0) {
      this.setState({
        elevationDifference: difference,
      });
      Alert.alert(
        
          this.state.userElevation + 'and' + this.state.desElevation + 'diff' + this.state.difference
          // + 
          // 'The elevation Difference is ' +
          // difference +
          // ' meters!',
      );
    } else {
      this.setState({
        elevationDifference: 0,
      });
    }
    console.log('diff.', this.state.elevationDifference);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blueTitle}>ELEVATE</Text>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
          mapType={'standard'}
          // stopPropagation={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          userLocationCalloutEnabled={true}
          loadingIndicatorColor={'red'}
          minZoomLevel={6}
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
            identifier={'one'}
            title={'You are here!'}
            coordinate={{
              latitude: this.state.userLat,
              longitude: this.state.userLon,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
            <Callout tooltip style={styles.bubble}>
              <Text>Lat: {this.state.userLat}</Text>
              <Text>lon: {this.state.userLon}</Text>
              {/* <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}>Get Elevation</Text>
              </TouchableOpacity> */}
            </Callout>
          </MapView.Marker>
          {this.state.marker && (
            <Marker
              identifier={'two'}
              title={'destination'}
              coordinate={{
                latitude: this.state.markerLat,
                longitude: this.state.markerLon,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
              }}
              pinColor={'gold'}>
              <Callout tooltip style={styles.bubble}>
                <Text>Lat: {this.state.markerLat}</Text>
                <Text>lon: {this.state.markerLon}</Text>
                <TouchableOpacity style={styles.button}>
                </TouchableOpacity>
              </Callout>
            </Marker>
          )}
        </MapView>
        <TouchableOpacity
          onPress={() => this.getElevationDifference()}
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
  itemContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'skyblue',
    width: 60,
    backgroundColor: 'white',
    padding: 20,
    paddingRight: 25,
  },
  blueTitle: {
    color: 'aqua',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 120,
    marginTop: 20,
    height: 35,
  },
  bubble: {
    backgroundColor: 'red',
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
