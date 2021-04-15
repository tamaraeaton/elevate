import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import PlaceInput from '../../components/autoLocationComponent';
import { styles } from './style';

const image = { uri: "https://images.unsplash.com/photo-1535876686418-25017bc5cbaf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZWxldmF0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" };

function HomeScreen2() {
  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image2}>
          <Text>We are a Mountain!</Text>
        </ImageBackground>
      </View>
    </>
  );
}
export default HomeScreen2;
