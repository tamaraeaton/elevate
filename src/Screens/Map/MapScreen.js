import React from 'react';
import {Text, View} from 'react-native';
import MapComponent from '../../components/mapComponent';
import LocationDisplay from '../../components/showLocationComponent'
const MapScreen = () => {
  return (
    <>
    <LocationDisplay/>
    <MapComponent/>
    </>
  );
};

export default MapScreen;
