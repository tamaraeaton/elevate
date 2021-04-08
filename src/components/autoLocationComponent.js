import React, {Component} from 'react';
import {TextInput, StyleSheet, View,Text, TouchableOpacity} from 'react-native'
import axios from 'axios';
import _ from 'lodash';
export default class PlaceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          input: "",
          predictions: [],
          destinationInput: ""
        };
        this.getPlacesDebounced = _.debounce(this.getPlaces, 1000);
        this.setDestination = this.setDestination.bind(this);
      }
async getPlaces(input) {
    const result = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4&input=${input}`
    );
    this.setState({ predictions: result.data.predictions})
    console.log(result.data) 
}
 setDestination(main_text){
    this.setState({destinationInput: main_text})
}
    render() {
        const predictions = this.state.predictions.map(prediction => {
           return(
           <TouchableOpacity key={prediction.id} onPress={() => this.setDestination(prediction.structured_formatting.main_text)}>
                <View style={styles.suggestions}>
                <Text>{prediction.structured_formatting.main_text}</Text>
                <Text style={styles.secondary}>{prediction.structured_formatting.secondary_text}</Text>
            </View>
           </TouchableOpacity>
            )
        })
        return (
           <View >
                <TextInput
                value={this.state.destinationInput}
                autoCorrect= {false}
                autoCapitalize="none"
                style={styles.input}
                placeholder= 'where to...'
                onChangeText={input => {
                    this.setState({destinationInput: input})
                    this.getPlacesDebounced(input)}
                }
            />
            {predictions}
           </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'white',
    },
    suggestions: {
        backgroundColor: 'white',
        padding: 15,
        borderTopWidth: 0.5,
        borderColor: 'gray'
    },
    secondary: {
        color: 'gray'
    }
})






