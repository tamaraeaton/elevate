import React from 'react';
import {StyleSheet, View, Alert, Text, TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class ElevationMap extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerCalloutPress = this.onMarkerCalloutPress.bind(this);
    this.onUserLocationMarkerCalloutPress = this.onUserLocationMarkerCalloutPress.bind(
      this,
    );
    this.getElevationDifference = this.getElevationDifference.bind(this);
    this.state = {
      markerLat: 0,
      markerLon: 0,
      userLatitude: 0,
      userLongitude: 0,
      userElevation: 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      eleCoordinates: 0,
      markerElevation: 0,
      marker: null,
      elevationDifference: 0,
    };
  }

  onUserLocationMarkerCalloutPress = async () => {
    let userElevateCoordinates =
      this.state.userLatitude + ',' + this.state.userLongitude;
    let userElevationCoordinates = userElevateCoordinates.toString();
    return await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyAC0rfEw46oQI8o22_X-ZSFCrIzPF-BZlk`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.results[0].elevation),
          this.setState({userElevation: responseJson.results[0].elevation});
        Alert.alert(
          'Your current Elevation is ' +
            responseJson.results[0].elevation +
            ' meters!',
        );
      })
      .catch(error => {
        console.error(error);
      });
  };
  componentDidMount = () => {
    this.getUserPosition();
  };

  onMarkerCalloutPress = async () => {
    let elevateCoordinates = this.state.markerLat + ',' + this.state.markerLon;
    let elevationCoordinates = elevateCoordinates.toString();
    return await fetch(
      `https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyAC0rfEw46oQI8o22_X-ZSFCrIzPF-BZlk`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.results[0].elevation),
          this.setState({markerElevation: responseJson.results[0].elevation});
        Alert.alert(
          'The Marker Elevation is ' +
            responseJson.results[0].elevation +
            ' meters!',
        );
      })
      .catch(error => {
        console.error(error);
      });
  };
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
  // componentDidMount() {
  //     Geolocation.getCurrentPosition(
  //         pos => {
  //             this.setState({
  //                 userLatitude: pos.coords.latitude,
  //                 userLongitude: pos.coords.longitude,
  //             });
  //         },
  //         (error) => {

  //             console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  // }
  getElevationDifference = () => {
    if (this.state.userElevation != 0 && this.state.markerElevation != 0) {
      const difference = this.state.userElevation - this.state.markerElevation;
      this.setState({
        elevationDifference: difference,
      });
    } else {
      this.setState({
        elevationDifference: 0,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="terrain"
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          loadingIndicatorColor={'red'}
          minZoomLevel={3}
          maxZoomLevel={15}
          loadingEnabled={true}
          loadingBackgroundColor={'blue'}
          showsCompass={true}
          pitchEnabled={true}
          initialRegion={{
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
              latitude: this.state.userLatitude,
              longitude: this.state.userLongitude,
            }}>
            <Callout onPress={this.onUserLocationMarkerCalloutPress}>
              <Text>Lat: {this.state.userLatitude}</Text>
              <Text>lon: {this.state.userLongitude}</Text>
              <Text>Elevation:{this.state.userElevation}</Text>
            </Callout>
          </Marker>
          {this.state.marker && (
            <Marker
              coordinate={this.state.marker}
              pinColor={'gold'}
              onPress={this.onMarkerCalloutPress}>
              <Callout key={2} onPress={this.getElevationDifference}>
                <Text>Lat:{this.state.markerLat}</Text>
                <Text>lon:{this.state.markerLon}</Text>
                <Text>Elevation:{this.state.markerElevation}</Text>
                <Text>{this.state.elevationDifference}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
        <TouchableOpacity
          // onPress={() => }
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
