import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options={
  title: 'Pic App',
}


class GeolocationExample extends Component {

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Choose your image</Text>
      </View>
    );
  }
}

export default GeolocationExample;