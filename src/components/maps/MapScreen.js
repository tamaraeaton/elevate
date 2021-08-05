import React from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const mapDeltas = {
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      latitude: 0,
      longitude: 0,
      userLat: 0,
      userLon: 0,
      userElevation: 0,
      desElevation: 0,
      elevationDifference: 0,
      markerLat: 0,
      markerLon: 0,
      marker: null,
    };
  }

  userLocationMarkerCalloutPress = async () => {
    let userCoordinates = this.state.userLat + ',' + this.state.userLon;
    let userElevationCoordinates = userCoordinates.toString();
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyAC0rfEw46oQI8o22_X-ZSFCrIzPF-BZlk`,
      );
      const responseJson = await response.json();
      this.state.userElevation = responseJson.results[0].elevation;
    } catch (error) {}
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
    console.log('return destinationElevation', this.state.desElevation);
    return this.state.desElevation;
  };

  getUserPosition() {
    this.locationWatchId = Geolocation.watchPosition(
      (pos) => {
        console.log('pos1', pos);
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          userLat: pos.coords.latitude,
          userLon: pos.coords.longitude,
        });
      },
      (err) => console.warn(err),
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

  async getElevationDifference() {
    if (this.state.userLat && this.state.markerLat !== 0) {
      await this.userLocationMarkerCalloutPress();
      await this.userDestinationMarkerCalloutPress();
    }
    let difference = this.state.desElevation - this.state.userElevation;
    if (difference != 0) {
      this.setState({
        elevationDifference: difference,
      });

      Alert.alert(
        this.state.userElevation.toFixed(2) +
          ' and ' +
          this.state.desElevation.toFixed(2) +
          ' diff: ' +
          difference.toFixed(2),
      );
    } else {
      this.setState({
        elevationDifference: 0,
      });
    }
    console.log('diff.', this.state.elevationDifference);
  }

  onPressMapHandler = (e) => {
    this.setState({
      markerLat: e.nativeEvent.coordinate.latitude,
      markerLon: e.nativeEvent.coordinate.longitude,
      marker: e.nativeEvent.coordinate,
    });
  };

  onRegionChangeComplete = (event) => {
    const {latitude, longitude} = event || {};
    this.state.latitude = latitude;
    this.state.longitude = longitude;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            ...mapDeltas,
          }}
          mapType={'satellite'}
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
          onPress={this.onPressMapHandler}
          onRegionChangeComplete={this.onRegionChangeComplete}>
          <MapView.Marker
            identifier={'one'}
            title={'You are here!'}
            coordinate={{
              latitude: this.state.userLat,
              longitude: this.state.userLon,
              ...mapDeltas,
            }}>
            <Callout tooltip>
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>
                  Lat: {this.state.userLat.toFixed(2)}
                </Text>
                <Text style={styles.bubbleText}>
                  Lon: {this.state.userLon.toFixed(2)}
                </Text>
              </View>
            </Callout>
          </MapView.Marker>
          {this.state.marker && (
            <Marker
              identifier={'two'}
              title={'destination'}
              coordinate={{
                latitude: this.state.markerLat,
                longitude: this.state.markerLon,
                ...mapDeltas,
              }}
              pinColor={'skyblue'}>
              <Callout tooltip>
                <View style={styles.bubble}>
                  <Text style={styles.bubbleText}>
                    Lat: {this.state.markerLat.toFixed(2)}
                  </Text>
                  <Text style={styles.bubbleText}>
                    Lon: {this.state.markerLon.toFixed(2)}
                  </Text>
                  <TouchableOpacity style={styles.button} />
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => this.getElevationDifference()}
            style={styles.button}>
            <Text style={styles.buttonText}>ELEVATION DIFFERENCE</Text>
          </TouchableOpacity>
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
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonText: {
    height: 23,
    width: 223,
    color: '#FFFFFF',
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
  bubble: {
    borderRadius: 15,
    paddingLeft: 15,
    padding: 1,
    backgroundColor: '#0E9AFF',
    width: 110,
    height: 43,
  },
  bubbleText: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#0E9AFF',
    borderRadius: 15,
    width: 253,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    padding: 5,
  },
});
