import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import Login from './LogIn/Login';
import SignUp from './LogIn/SignUp';
import Poll from './Poll';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/HomeTab';
import AddPollTab from './AppTabNavigator/AddPollTab';
import NotifiTab from './AppTabNavigator/NotifiTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import { propTypes } from 'react-native/Libraries/Components/Button';
// import Icon from 'react-native-vector-icons/Iconicons';

const headerBackground = (props) => (<Image {...props} />);


const polltabs = createBottomTabNavigator({
  HomeTab: {
    screen: Poll,
    navigationOptions: (props) => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Image name
          name="ios-home"
          color={tintColor}
          size={24}
        // source={require('../imgs/LogoIcon.png')}
        />
      )
    })
  },
  SearchTab: SearchTab,
  AddPollTab: AddPollTab,
  NotifiTab: NotifiTab,
  ProfileTab: ProfileTab
},
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: 'pink',
      },
      // tabBarComponent: props => {
      //   <Image
      //     {...props}
      //     style={{ width: 100, height: 50 }}
      //     source={require('../imgs/NavBar.png')}
      //   />
      // }
    },
    navigationOptions: {
      headerBackground: (
        <Image
          style={{ width: 100, height: 50 }}
          source={require('../imgs/NavBar.png')}
        />
      ),
    }
  });

export default createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Poll: polltabs,
});


const styles = StyleSheet.create({
  bottomBG: {
    height: 100,
    width: 100,
    position: "absolute",
  }
});
