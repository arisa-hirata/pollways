import React from 'react';
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
import firebase from 'firebase';
import Spinner from './Spinner';

const { width, height } = Dimensions.get('screen');


export default class Login extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = { email: '', password: '', error: '', loading: false };


  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Cannot find your account, please check your password and email address', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    this.props.navigation.navigate('Poll');
  }

  renderButton() {
    // if (this.state.loading) {
    //   return <Spinner />;
    // }
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
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />

          <Text style={styles.errorTextStyle}>
            {this.state.error}
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
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{ color: "#fff", fontWeight: "700" }}> Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ImageBackground>
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
