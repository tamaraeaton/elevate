import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { styles } from './style';
import PlaceInput from '../../components/autoLocationComponent';


const image = require('../../../assets/elevate-logo.png')

function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.inputHeight}>
        <PlaceInput />
      </View>
      <View style={styles.container}>
        {/* <Text>This is our home screen</Text> */}
        <Image 
          style={styles.image1}
          source={image}
        />
        <Button
          title="See more about us"
          color='#95b2e6'
          onPress={() => navigation.navigate('Home2')}
        />
      </View>
    </>
  );
}


export default HomeScreen;
