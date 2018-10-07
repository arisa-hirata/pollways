import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';

import Login from './LogIn/Login';
import SignUp from './LogIn/SignUp';
import Poll from './Poll';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/HomeTab';
import AddPollTab from './AppTabNavigator/AddPollTab';
import NotifiTab from './AppTabNavigator/NotifiTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
// import Icon from 'react-native-vector-icons/Iconicons';


const polltabs = createBottomTabNavigator({
  HomeTab: {
    screen: Poll,
    navigationOptions: {
      tabBarLabel: 'Home',
      // tabBarIcon: ({ tintColor }) => (
      //   <Icon name="ios-home" size={24} />
      // )
    }
  },
  SearchTab: SearchTab,
  AddPollTab: AddPollTab,
  NotifiTab: NotifiTab,
  ProfileTab: ProfileTab
});


export default createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Poll: polltabs,
})
