import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';

const LegalScreen = () => {
  return (
    <ImageBackground source={require('../../assets/backgroundLegal.jpg')} style={styles.legalImageBackground}>
      <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
      <Text style={styles.disclaimerText}>
        The measurements are as close to correct as possible, although the
        measurements could slightly be off.
      </Text>
      <Text style={styles.agreementTitle}>User Agreement:</Text>
      <Text style={styles.agreementText}>
        We have the right to suspend or delete the accounts of abusive users who
        violate this app's terms and conditions. Prohibited activies could
        include copyright infringement, spamming other users, and general misuse
        of your app.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  legalImageBackground: {
    margin: 0,
    height: 800
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10
  },
  disclaimerText: {
    fontSize: 20,
    margin: 20,
  },
  agreementTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10
  },
  agreementText: {
    fontSize: 20,
    margin: 20,
  },
});

export default LegalScreen;

