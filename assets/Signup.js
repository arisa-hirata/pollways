import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
  Button, 
  Picker } from 'react-native';

export default class App extends React.Component {

  state = {Age: '', Country: ''}

  updateUser = (Age) => {
    this.setState({Age: Age})
  }

   updateUserCountry = (Country) => {
    this.setState({Country: Country})
  }

  updateUserCity = (City) => {
    this.setState({City: City})
  }


  render() {
    return (
      <ImageBackground style={styles.imgBackground} 
      resizeMode='cover' 
      source={require('../assets/Imgs/LogInBG.jpg')}>
      
      <View style = {styles.container}> 
        <Image
          style={styles.signupImg}
          source={require("../assets/Imgs/Signup.png")}/>
          <Image
          style={styles.LineDesign}
          source={require("../assets/Imgs/LineLogin@4x-8.png")}/>

      <View>
        <Text style={styles.signupText}>Email</Text>
        <TextInput
          style={styles.inputs}
          placeholder = " ">
        </TextInput>

        <Text style={styles.signupText}>Username</Text>
        <TextInput
          style={styles.inputs}
          placeholder = " ">
        </TextInput>

        <Text style={styles.signupText}>Password</Text>
        <TextInput
          style={styles.inputs}
          placeholder = " ">
        </TextInput>
      
        <Text style={styles.signupText}>Age</Text>
        <View style={styles.pickerTextAge}>
        <Picker style={{height: 35}} selectedValue = {this.state.Age} onValueChange = {this.updateUser}>
          <Picker.Item label = "Select Age" value = "ageSelect" />
          <Picker.Item label = "17" value = "17" />
          <Picker.Item label = "18" value = "18" />
          <Picker.Item label = "19" value = "19" />
          <Picker.Item label = "20" value = "20" />
          <Picker.Item label = "21" value = "21" />
          <Picker.Item label = "22" value = "22" />
          <Picker.Item label = "23" value = "23" />
          <Picker.Item label = "24" value = "24" />
          <Picker.Item label = "25" value = "25" />
          <Picker.Item label = "26" value = "26" />
          <Picker.Item label = "27" value = "27" />
          <Picker.Item label = "28" value = "28" />
          <Picker.Item label = "29" value = "29" />
          <Picker.Item label = "30" value = "30" />
          <Picker.Item label = "31" value = "31" />
        </Picker></View>

        <Text style={styles.signupText}>Country</Text>
        <View style={styles.pickerCountry}>
        <Picker style={{height: 35}} selectedValue = {this.state.Country} onValueChange = {this.updateUserCountry}>
          <Picker.Item label = "Select Country" value = "ageSelect" />
          <Picker.Item label = "Canada" value = "Canada" />
          <Picker.Item label = "USA" value = "USA" />
          <Picker.Item label = "Australia" value = "Australia" />
          <Picker.Item label = "Taiwan" value = "Taiwan" />
          <Picker.Item label = "China" value = "China" />
          <Picker.Item label = "South Korea" value = "South Korea" />
          <Picker.Item label = "Vietnam" value = "Vietnam" />
          <Picker.Item label = "Mexico" value = "Mexico" />
        </Picker></View>

        
        <Text style={styles.signupText}>City</Text>
        <View style={styles.pickerCountry}>
        <Picker style={{height: 35}} selectedValue = {this.state.City} onValueChange = {this.updateUserCity}>
          <Picker.Item label = "Select City" value = "ageSelect" />
          <Picker.Item label = "17" value = "17" />
          <Picker.Item label = "18" value = "18" />
        </Picker></View>
      </View>

       <TouchableOpacity onPress={this._onPressButton}>
            <Image
              style={styles.start}
              source={require("../assets/Imgs/Start@4x-8.png")}
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
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
},
signupImg: {
  width: 150,
  resizeMode: 'contain',
},
LineDesign: {
  width: 300,
  resizeMode: 'contain',
  margin: 5,
  padding: 10,
},
inputs: {
  width: 300,
  height: 35,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: 'white',
  margin: 5,
  padding: 10,
},
signupText: {
  paddingLeft: 5,
  paddingTop: 3,
  margin: 1,
},
pickerTextAge: {
  width: 150,
  borderRadius: 10,
  borderWidth:1,
  borderColor: 'white',
  overflow: 'hidden',
  backgroundColor: 'white',
  margin: 5,
},
pickerCountry: {
  width: 200,
  borderRadius: 10,
  borderWidth:1,
  borderColor: 'white',
  overflow: 'hidden',
  backgroundColor: 'white',
  margin: 5,
},
start: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},
});
