import React, {useState, useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {PermissionsAndroid, Platform} from 'react-native';

import MapScreen from '../maps/MapScreen';

function HomeScreen({navigation}) {
  const [hasMapPermissions, setHasMapPermissions] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasMapPermissions(true);
        }
      } else {
        setHasMapPermissions(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      {hasMapPermissions ? (
        <>
          <MapScreen />
        </>
      ) : null}
    </>
  );
}
export default HomeScreen;
