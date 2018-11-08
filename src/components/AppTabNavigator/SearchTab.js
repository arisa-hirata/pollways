import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';


export default class SearchTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: "100%",
            height: 85,
            position: "absolute",
            top: 0,
          }}
          source={require('../../imgs/Header.png')}
        />
        <Text>SearchTab!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
