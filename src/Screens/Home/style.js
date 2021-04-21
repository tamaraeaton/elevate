import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  logo: {
    zIndex: 1,
    width:'100%',
    height:120
  },
  home_image: {
    width:'100%',
    height:'100%'
  },
  view: {
    backgroundColor: 'rgba(149, 178, 230, 0.6)', 
    marginTop: 200
  },
  text1: {
    textAlign: 'center', 
    fontSize: 20, 
    paddingRight: 10
  },
  text2: {
    textAlign: 'center', 
    fontSize: 20, 
    color: 'white',
    paddingRight: 10,
    marginTop:40
  }
});
