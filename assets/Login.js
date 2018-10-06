import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, TouchableOpacity, Button } from 'react-native';

export default class App extends React.Component {
  
  state = {
    email: '',
    password: ''
  }
  handleEmail = (text) => {
    this.setState({email: text})
  }
  handlePassword = (text) => {
    this.setState({email: text})
  }
  SignupPage=()=> {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (

      <ImageBackground style={[styles.imgBackground, styles.container]} 
        resizeMode='cover' 
        source={require('../assets/Imgs/LogInBG.jpg')}>

          <View style={styles.container}>
            <Image
              style={styles.logoSize}
              source={require('../assets/Imgs/Logo.png')}
            />
          </View>
          
          <View style = {styles.Textcontainer}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               border = '1'
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity onPress={this._onPressButton}>
            <Image
              style={styles.start}
              source={require("../assets/Imgs/Start@4x-8.png")}
            />
            </TouchableOpacity>

            <View>
            <Image
              style={styles.LineDesign}
              source={require('../assets/Imgs/LineLogin@4x-8.png')}
            />
          </View>

           <TouchableOpacity onPress={this.SignupPage}>
            <Image
              style={styles.signup}
              source={require("../assets/Imgs/Signup@4x-8.png")}
            />
            </TouchableOpacity>

         </View>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Textcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
},
logoSize: {
  marginTop: 100,
  width: 350,
  height: 350,
  resizeMode: 'contain',
},
input: {
  width: 300,
  height: 35,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: 'white',
  margin: 5,
  padding: 10,
},
start: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},
LineDesign: {
  width: 300,
  height: 10,
  resizeMode: 'contain',
},
signup: {
  width: 200,
  resizeMode: 'contain'
},
});
