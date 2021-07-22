import React from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';

const InfoScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/backgroundInfo.jpg')}
      style={styles.InspirationView}>
      <Text style={styles.ElevateTitle}>Inspiration:</Text>
      <Text style={styles.ElevateText}>
        Elevate was created because we wanted to find the elevation of a
        mountain in our backyard.
      </Text>
      <Text style={styles.VersusTitle}>Elevation vs Altitude:</Text>
      <Text style={styles.ElevationDefinition}>
        Elevation tells how far above sea level a specific point is located.
      </Text>
      <Text style={styles.AltitudeDefinition}>
        Altitude is the distance between an object and the Earth's surface.
      </Text>
      <Text style={styles.HowToTitle}>How to use Elevate:</Text>
      <Text style={styles.HowToText}>
        The first map marker will be placed automatically where your current
        location is. The second marker you must click on the map where you are
        desiring to find the elevation of that location and the difference of
        elevation between the two desired markers.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  InspirationView: {
    padding: 15,
    height: 1000,
  },
  ElevateTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ElevateText: {
    fontSize: 20,
    margin: 15,
  },
  VersusTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ElevationDefinition: {
    fontSize: 20,
    margin: 15,
  },
  AltitudeDefinition: {
    fontSize: 20,
    margin: 15,
  },
  HowToTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  HowToText: {
    fontSize: 20,
    margin: 15,
  },
});

export default InfoScreen;
