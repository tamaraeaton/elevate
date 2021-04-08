import React, {Component} from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {styles} from './style';
export default class MapComponent extends Component {
  render() {
    return (
      <>
        <MapView
          showsUserLocation
          followsUserLocation
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.7896386,
            longitude: -122.421646,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
        />
      </>
    );
  }
}
