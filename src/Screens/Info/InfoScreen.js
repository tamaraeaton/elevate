import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './style';


const elevationExplanation = require('../../../assets/elevation_and_altitude_800x.webp')

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{margin:20}}>HEIGHT is the vertical distance of a point to a horizontal surface. ELEVATION is the height of a point above (or below) sea level. SEA LEVEL or, as it is more usually called, mean sea level, is the average height of the surface of the sea.</Text>
<Image 
source={elevationExplanation} 
style={{width:300, height: 200,  alignSelf: 'center', padding:20, resizeMode:"stretch"}}
/>
    </View>
  );
};
export default InfoScreen;
