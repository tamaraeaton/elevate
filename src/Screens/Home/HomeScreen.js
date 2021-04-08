import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './style';
import PlaceInput from '../../components/autoLocationComponent';

function HomeScreen({navigation}) {
  return (
    <>
      <View style={styles.inputHeight}>
        <PlaceInput />
      </View>
      <View style={styles.container}>
        <Text>This is our Home Page</Text>
        <Button title="home 2" onPress={() => navigation.navigate('Home2')} />
      </View>
    </>
  );
}
export default HomeScreen;
