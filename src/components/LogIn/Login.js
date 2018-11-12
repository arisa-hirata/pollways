import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, loginUserSuccess } from '../../actions';
import { getFB } from "../firebase";
import Spinner from './Spinner';

const { width, height } = Dimensions.get('screen');

class Login extends Component {
  static navigationOptions = {
    header: null,
    headerBackground: null
  };

  constructor(props) {
    super(props)
    getFB().auth().onAuthStateChanged((user) => {
      if (user !== null) {
        props.loginUserSuccess({ user });
        props.navigation.navigate('Poll');
      }
    });
  }

  state = { loggedIn: null };
  email = ""
  password = ""

  static getDerivedStateFromProps(props, state) {
    if (props.user !== null) {
      props.navigation.navigate('Poll');
    }

    return {
      ...state
    }
  }

  onEmailChange(text) {
    // this.props.emailChanged(text);
    this.email = text
  }

  onPasswordChange(text) {
    // this.props.passwordChanged(text);
    this.password = text
  }

  onButtonPress() {
    this.props.loginUser({
      email: this.email,
      password: this.password
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
    );

  }

  render() {
    return (
      <ImageBackground
        style={[styles.imgBackground, styles.container]}
        source={require('../../imgs/LogInBG.jpg')}>


        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.logoSize}
            source={require('../../imgs/Logo.png')}
          />
        </View>

        <View style={styles.Textcontainer}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            border='1'
            onChangeText={this.onEmailChange.bind(this)}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={this.onPasswordChange.bind(this)}
          />

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <View>
            {this.renderButton()}
          </View>


          <View style={styles.border} />

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Don't have an account?
              </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignUp')
              }
              }
              title="Sign Up"
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}> Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>



      </ImageBackground >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  Textcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  imgBackground: {
    width: width,
    height: height,
  },
  logoSize: {
    width: 100,
    height: 100,
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    margin: 5,
    padding: 10,
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
  border: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: 300,
    margin: 20,
  },
  errorTextStyle: {
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth }) => {
  // const { email, password, error, loading, user } = auth;

  return { ...auth };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, loginUserSuccess
})(Login);
