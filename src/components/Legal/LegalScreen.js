import React from 'react';
import {ImageBackground, Text, StyleSheet} from 'react-native';

const Legal = () => {
  return (
    <ImageBackground source={require('./backgroundLegal.jpg')} style={styles.legalImageBackground}>
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
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  disclaimerText: {
    fontSize: 20,
    margin: 15,
  },
  agreementTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  agreementText: {
    fontSize: 20,
    margin: 15,
  },
});

export default Legal;
