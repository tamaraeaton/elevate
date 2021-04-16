import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  inputHeight: {
    width: '100%',
    marginTop: 20,
    color: 'gray'
  },
  image0: {
    width: '100%',
    height:'100%',
    zIndex: 0
  },
  image1: {
    zIndex: 1,
    width:'100%',
    height:120,
    marginBottom:30

  },
  image2: {
    width:'100%',
    height:'100%'

  }
});
