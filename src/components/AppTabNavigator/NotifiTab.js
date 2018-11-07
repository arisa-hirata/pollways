import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';


export default class NotificationTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <ImageBackground
          style={{
            width: "100%",
            height: 70,
            position: "absolute",
            top: 0,
          }}
          source={require('../../imgs/Header.png')}
        />

        <Text>Notification</Text>
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
