// import React, {useState} from 'react';
// import MapView, { View, Text, PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
// import {styles} from './style';

// const MapComponent = () => {

//   const [markers, setMarkers] = useState([]);

//    const handlePress =(e) => {
//       setMarkers({
//         markers: [
//           ...markers,
//           {
//             coordinate: e.nativeEvent.coordinate,
//             elevation: 23243,
//           }
//         ]
//       })
//        }

//   return(
//     <>
//          <MapView
//            showsUserLocation
//            followsUserLocation
//            // provider={PROVIDER_GOOGLE}
//            style={styles.map}
//            initialRegion={{
//              latitude: 37.7896386,
//              longitude: -122.421646,
//              latitudeDelta: 0.09,
//              longitudeDelta: 0.035,
//            }}
//            onPress={handlePress}
//            >
//            {markers.map((marker) =>{
//              return (
             
//                <Marker {...marker} />
//              )
//            })}
//          </MapView>
//        </>
//   )
// }

// export default MapComponent;

import React, {Component} from 'react';
import MapView, { View, Text, PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {styles} from './style';
export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: Math.round(Math.random()* 10000000000)
        }
      ]
    })
  }

  render() {
    return (
      <>
        <MapView
          showsUserLocation
          followsUserLocation
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 35.0997,
            longitude: -90.0108,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}
          onPress={this.handlePress}
          >
          {this.state.markers.map((marker) =>{
            return (
             
              <Marker  key={marker.key} {...marker} />
            )
          })}
        </MapView>
      </>
    );
  }
}

  {/* <Marker {...marker} >
                <View style={styles.marker}>
                  <Text style={styles.text}>{marker.elevation}</Text>
                </View>
              </Marker> */}