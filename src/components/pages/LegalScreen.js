import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';

const LegalScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/backgroundLegal.jpg')}
      style={styles.legalImageBackground}>
      <Text style={styles.privacyTitle}>Privacy & Policy:</Text>
      <Text style={styles.privacyText}>
        The Elevation app requires you to allow your current location and an
        internet connection to calculate the elevation between two desired
        coordinates.
      </Text>
      <Text style={styles.privacyText}>
        The Elevation app does not collect any identifying or personal data.
        Your location is not being saved by the app or any of its developers.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  legalImageBackground: {
    margin: 0,
    height: 800,
  },
  privacyTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  privacyText: {
    fontSize: 20,
    margin: 20,
  },
});

export default LegalScreen;
