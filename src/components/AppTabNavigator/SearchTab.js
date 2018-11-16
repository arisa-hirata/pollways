import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';


export default class SearchTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, color: 'white', top: -100, zIndex: 10}}>Filters</Text>
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
