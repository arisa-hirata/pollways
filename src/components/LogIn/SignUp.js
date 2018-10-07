import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
  Picker,
  Dimensions
} from 'react-native';
import firebase from 'firebase';
import Poll from '../Poll';


const { width, height } = Dimensions.get('screen');


export default class SignUp extends React.Component {

  static navigationOptions = {
    header: null
  }

  onButtonPress() {
    this.props.navigation.navigate('Poll')
    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    { () => this.props.navigation.navigate('Poll') }
  }

  state = { Age: '', Country: '' }

  updateUser = (Age) => {
    this.setState({ Age: Age })
  }

  updateUserCountry = (Country) => {
    this.setState({ Country: Country })
  }

  updateUserCity = (City) => {
    this.setState({ City: City })
  }


  render() {
    return (
      <View>
        <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../imgs/LogInBG.jpg')}>

          <View style={styles.container}>
            <Text style={styles.signUptxt}>
              Sign Up
          </Text>

            <View style={styles.border} />

            <View>
              <Text style={styles.signupText}>Email</Text>
              <TextInput
                style={styles.inputs}
                placeholder=" "
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />

              <Text style={styles.signupText}>Username</Text>
              <TextInput
                style={styles.inputs}
                placeholder=" ">
              </TextInput>

              <Text style={styles.signupText}>Password</Text>
              <TextInput
                style={styles.inputs}
                placeholder=" "
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />

              <Text style={styles.signupText}>Age</Text>
              <View style={styles.pickerTextAge}>
                <Picker style={{ height: 35 }} selectedValue={this.state.Age} onValueChange={this.updateUser}>
                  <Picker.Item label="Select Age" value="ageSelect" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="26" value="26" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="28" value="28" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="31" value="31" />
                </Picker></View>

              <Text style={styles.signupText}>Country</Text>
              <View style={styles.pickerCountry}>
                <Picker style={{ height: 35 }} selectedValue={this.state.Country} onValueChange={this.updateUserCountry}>
                  <Picker.Item label="Select Country" value="ageSelect" />
                  <Picker.Item label="Canada" value="Canada" />
                  <Picker.Item label="USA" value="USA" />
                  <Picker.Item label="Australia" value="Australia" />
                  <Picker.Item label="Taiwan" value="Taiwan" />
                  <Picker.Item label="China" value="China" />
                  <Picker.Item label="South Korea" value="South Korea" />
                  <Picker.Item label="Vietnam" value="Vietnam" />
                  <Picker.Item label="Mexico" value="Mexico" />
                </Picker></View>


              <Text style={styles.signupText}>City</Text>
              <View style={styles.pickerCountry}>
                <Picker style={{ height: 35 }} selectedValue={this.state.City} onValueChange={this.updateUserCity}>
                  <Picker.Item label="Select City" value="ageSelect" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                </Picker></View>
            </View>

            <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
              <Text style={styles.btnText}>Start</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
    );
  }
}

// const AppStackNavigator = createStackNavigator({

//   Poll: Poll
// })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground: {
    width: width,
    height: height,
  },
  signUptxt: {
    fontSize: 40,
    color: "#fff",
  },
  border: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 300,
    margin: 20,
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
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 5,
  },
  pickerCountry: {
    width: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    borderColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 10,
    width: 90,
    height: 45,
    textAlign: "center",
    backgroundColor: "transparent",
    marginTop: 30,
    padding: 7,
  },
});
