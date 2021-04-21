import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { styles } from './style';

const image = require('../../../assets/elevate-logo2.png')
const imageBackground = require('../../../assets/ogden-wasatch.png')

function HomeScreen({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={image}
        />
        <ImageBackground source={imageBackground} style={styles.home_image}>
          <View style={styles.view}>
            <Text style={styles.text1}>
              Imagine living right next to this mountain range.  And you want to know the elevation difference from your house to the top of the hill.
            </Text>
          </View>
          <Text style={styles.text2}>
            Click on Maps below and find out...
          </Text>
        </ImageBackground>
      </View>
    </>
  );
};

export default HomeScreen;
