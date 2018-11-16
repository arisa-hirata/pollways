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
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import { getFB } from "../firebase";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signUp } from '../../actions';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('screen');

var firebase = getFB();

class SignUp extends Component {
  constructor(props) {
    super(props);
    //Password
    this.inputRefs = {};

    this.state = {
        age: "",
        items: [
            {
                label: 'Under 20',
                value: 'Under 20',
            },
            {
                label: '20s',
                value: '20s',
            },
            {
                label: '30s',
                value: '30s',
            },
              {
                label: '40s',
                value: '40s',
            },
            {
                label: '50s',
                value: '50s',
            },
              {
                label: 'Over 60s',
                value: 'Over 60s',
            },
        ],

        
        gender: "",
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

// users must fill in or it will return error ************************************
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
// **********************************************************************************
  onEmailChange=(text)=> {
    this.email = text
  }
// **********************************************************************************
  onPasswordChange=(text)=>{
    this.password = text
  }
// **********************************************************************************
  onButtonPress=()=>{
    this.props.signUp({
      email: this.email,
      password: this.password,
      username: this.userName,
      gender: this.state.gender,
      age: this.state.age,
      time: new Date(),
    });
  }
  render() {
    return (
      <View>
        <ImageBackground style={styles.imgBackground}
          resizeMode='cover'
          source={require('../../imgs/LogInBG.jpg')}>
<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <Text style={styles.signUptxt}>
              Sign Up
          </Text>

            <View style={styles.border} />

            <View>
              <Text style={styles.signupText}>Email</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Email Address"
                autoCapitalize="none"
                onChangeText={this.onEmailChange}
              />

              <Text style={styles.signupText}>Username</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Enter Pollways Username"
                onChangeText={(text) => { this.userName = text }}>
              </TextInput>

              <Text style={styles.signupText}>Password</Text>
              <TextInput
                  ref={(el) => {
                    this.inputRefs.pw = el;
                }}
                style={styles.inputs}
                placeholder="Enter Password"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.onPasswordChange}
              /> 
              
              <Text style={styles.signupText}>Age</Text>
              <View style={styles.pickerContainerOuter}>

              <View style={styles.pickerContainer}>
              <RNPickerSelect
                    placeholder={{
                        label: 'Age',
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
                </View>
                </View>

                <Text style={styles.signupText}>Gender</Text>
                <View style={styles.pickerContainerOuter}>
                <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Gender',
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
                </View>
              </View>

            <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
              <Text style={styles.btnText}>Start</Text>
            </TouchableOpacity>

          </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
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
    paddingTop: 2,
    paddingBottom: 2,
    margin: 1,
  },
  pickerContainer: {
    width: 120,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: -10,
  },
  pickerContainerOuter: {
    width: 120,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 5,
    marginLeft: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    borderColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 10,
    width: 150,
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
