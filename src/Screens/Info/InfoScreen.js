import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './style';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is our Info Page</Text>
      <Text>There is a whole bunch of information we can tell you about us here!</Text>
    </View>
  );
};
export default InfoScreen;
