import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

//import all the components we are going to use.
import Geolocation from 'react-native-geolocation-service';

const LocationDisplay = () => {

  
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [currentAltitude, setCurrentAltitude] = useState('...')
  const [currentElevation, setCurrentElevation] = useState('...')

  useEffect( async () => {
  const res = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${currentLongitude},${currentLatitude}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`);
  const data = await res.json()
  const currentElevation = JSON.stringify(data.results[0].elevation);
    setCurrentElevation(currentElevation);
    console.log(currentElevation)

}, []);



  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        const currentAltitude = JSON.stringify(position.coords.altitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        setCurrentAltitude(currentAltitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const currentAltitude = JSON.stringify(position.coords.altitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        setCurrentAltitude(currentAltitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <SafeAreaView >
      <View style={styles.elevation}>
        <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            
              color: 'green',
              fontSize: 16,
            }}>
            Elevation: {currentElevation}
            
          </Text>
        </View>
      <View>
        <View style={styles.container}>
          {/* <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 30, height: 30}}
          /> */}
          {/* <Text style={styles.boldText}>
            {locationStatus}
          </Text> */}
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              color: 'red',
              fontSize: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              color: 'green',
              fontSize: 16,
            }}>
            Latitude: {currentLatitude}
            
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              color: 'green',
              fontSize: 16,
            }}>
            Altitude: {currentAltitude}
            
          </Text>
        
          <View style={{marginTop: 20}}>
            <Button title="Current Location" onPress={getOneTimeLocation} />
          </View>
          
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    // position: 'relative',
    // top: 200,
    backgroundColor: 'lightgray',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    marginVertical: 16,
  },
  elevation: {
    position: 'relative',
    
    borderBottomWidth:3,
    backgroundColor:'red',
    borderRadius: 15,
    margin:5
    
  }
});

export default LocationDisplay;
