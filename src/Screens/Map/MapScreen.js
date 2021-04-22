// import React from 'react';
// import {Text, View} from 'react-native';
// import MapComponent from '../../components/mapComponent';
// import LocationDisplay from '../../components/showLocationComponent'
// const MapScreen = () => {
//   return (
//     <>
//     <LocationDisplay/>
//     <MapComponent/>
//     </>
//   );
// };

// export default MapScreen;

import React, { Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapComponent from '../../components/mapComponent';
import LocationDisplay from '../../components/showLocationComponent'

export default class MapScreen extends Component {

constructor(props) {
  super(props);
  this.state = {
    hasMapPermissions: true
  }
}

componentDidMount() {
  this.requestFineLocation() 
}

async requestFineLocation() {
  try {
    if(Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        this.setState({hasMapPermissions: true})
      }
    } else {
      this.setState({hasMapPermissions: true})
    }
  } catch (err) {
    console.warn(err);
  }
}

render() {
  if(this.state.hasMapPermissions){
    return(
      <>
      <LocationDisplay/>
      <MapComponent/>
     </>
    )
  } return null;
}


}