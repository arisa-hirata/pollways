import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
// import { Header, Button, Spinner } from './components/common';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import Login from './Login';
import SignUp from './SignUp';
import Poll from '../Poll';
import HomeTab from '../AppTabNavigator/HomeTab';
import SearchTab from '../AppTabNavigator/HomeTab';
import AddPollTab from '../AppTabNavigator/AddPollTab';
import NotifiTab from '../AppTabNavigator/NotifiTab';
import ProfileTab from '../AppTabNavigator/ProfileTab';

class LoginForm extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAxWDd4UeYmX9X9bgCPkIgKa7T_opCv9vA",
      authDomain: "pollways-85c25.firebaseapp.com",
      databaseURL: "https://pollways-85c25.firebaseio.com",
      projectId: "pollways-85c25",
      storageBucket: "pollways-85c25.appspot.com",
      messagingSenderId: "157764717750"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    return (
      <View>
        <AppStackNavigator />
        <BottomTabNavigator />
      </View>
    )
  };
  // switch (this.state.loggedIn) {
  //   case true:

  //   case false:
  //     return <Login />;
  //   default:
  //     return <Spinner size="large" />;
  // }
}


const AppStackNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Poll: Poll,
})

const BottomTabNavigator = createBottomTabNavigator({
  HomeTab: HomeTab,
  SearchTab: SearchTab,
  AddPollTab: AddPollTab,
  NotifiTab: NotifiTab,
  ProfileTab: ProfileTab
});



export default LoginForm;
