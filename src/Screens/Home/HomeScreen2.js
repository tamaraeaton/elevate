import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PlaceInput from '../../components/autoLocationComponent';
import { styles } from './style';

const image2 = require('../../../assets/north-ogden-divide.jpg')

function HomeScreen2() {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image2} style={styles.image2}>
          <Text style={{textAlign:'center', fontSize:30, marginTop:15, marginLeft:50}}>North Ogden Divide</Text>
        </ImageBackground>
      </View>
    </>
  );
}
export default HomeScreen2;
