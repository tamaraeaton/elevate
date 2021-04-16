import React from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { styles } from './style';
import PlaceInput from '../../components/autoLocationComponent';


const image = require('../../../assets/elevate-logo.png')
const imageBackground = {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPN-yzxIIK0386FlSspDS57ApPl2tCWbKMQ&usqp=CAU'}

function HomeScreen({ navigation }) {
  return (
    <>
 
      <View style={styles.container}>

        <ImageBackground source={imageBackground} style={styles.image0}>
         <Image 
          style={styles.image1}
          source={image}
        />
        <Button
          title="Click here for common elevations"
          color='#95b2e6'
          onPress={() => navigation.navigate('Home2')}
        />
      <View style={styles.inputHeight}>
        <PlaceInput />
      </View>
        </ImageBackground>
      </View>
    </>
  );
}


export default HomeScreen;
