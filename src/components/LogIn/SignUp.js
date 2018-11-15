import React, { Component } from 'react';
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

import { getFB } from "../firebase";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUp } from '../../actions';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('screen');


//accessing from FireBase
// var storage = getApp().storage();
var firebase = getFB();

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
        age: undefined,
        items: [
            {
                label: '17',
                value: '17',
            },
            {
                label: '18',
                value: '18',
            },
            {
                label: '19',
                value: '19',
            },
              {
                label: '20',
                value: '20',
            },
            {
                label: '21',
                value: '21',
            },
              {
                label: '22',
                value: '22',
            },
              {
                label: '23',
                value: '23',
            },
        ],
        gender: undefined,
        items2: [
            {
                label: 'Male',
                value: 'Male',
            },
            {
                label: 'Female',
                value: 'Female',
            }
           
        ],
        
    };
}
  static navigationOptions = {
    header: null
  }

  state = { loggedIn: null };
  email = ""
  password = ""
  username = '';
  gender = '';
  age = '';

  static getDerivedStateFromProps(props, state) {
    if (props.user !== null) {
      props.navigation.navigate('Poll');
    }

    return {
      ...state
    }
  }

  onEmailChange(text) {
    this.email = text
  }

  onPasswordChange(text) {
    this.password = text
  }

  onButtonPress() {
    this.props.signUp({
      email: this.email,
      password: this.password
    });

    var col = firebase.firestore().collection("profile").add({
      // uerid:"user",
      userID: '',
      userName: this.userName,
      gender: '',
      age: '',
      time: new Date()
    })



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
                onChangeText={this.onEmailChange.bind(this)}
              />

              <Text style={styles.signupText}>Username</Text>
              <TextInput
                style={styles.inputs}
                placeholder=" "
                onChangeText={(text) => { this.userName = text }}
              >
              </TextInput>

              <Text style={styles.signupText}>Password</Text>
              <TextInput
                  ref={(el) => {
                    this.inputRefs.pw = el;
                }}
                style={styles.inputs}
                placeholder=" "
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={this.onPasswordChange.bind(this)}
              />

              <Text style={styles.signupText}>Age</Text>
              <View style={styles.pickerCountry}>
              <RNPickerSelect
                    placeholder={{
                        label: 'Your Age',
                        value: null,
                    }}
                    items={this.state.items}
                    onValueChange={(value) => {
                        this.setState({
                            age: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.pw.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.age}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                />
                {/* <Picker
                  style={{ height: 35 }}
                  selectedValue={this.state.Age}
                  onValueChange={this.updateUser}>

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
                </Picker> */}
                </View>
                <Text style={styles.signupText}>Gender</Text>
              <View style={styles.pickerCountry}>
              <RNPickerSelect
                    placeholder={{
                        label: 'Your Gender',
                        value: null,
                    }}
                    items={this.state.items2}
                    onValueChange={(value) => {
                        this.setState({
                            gender: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.picker.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.country.focus();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.gender}
                    ref={(el) => {
                        this.inputRefs.picker2 = el;
                    }}
                />
                </View>
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
              <View style={styles.pickerTextAge}>
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
    margin: 10,
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
    paddingTop: 0,
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
    width: 150,
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
    marginTop: 15,
    padding: 7,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderRadius: 4,
      backgroundColor: 'white',
      color:'black'
      
  },
});
const mapStateToProps = ({ auth }) => {
  return { ...auth };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signUp
})(SignUp);
