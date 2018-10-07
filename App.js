import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import Poll from './src/./componentsPoll';
import LoginForm from './src/components/LogIn/LoginForm';


export default class App extends React.Component {
  render() {
    return (
      <ScrollView>
        <LoginForm />

        {/* <Poll /> */}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

});
