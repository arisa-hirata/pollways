import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import Login from './LogIn/Login';
import SignUp from './LogIn/SignUp';

import Poll from './AppTabNavigator/Poll';
import SearchTab from './AppTabNavigator/SearchTab';
import AddPollTab from './AppTabNavigator/AddPollTab';
import NotifiTab from './AppTabNavigator/NotifiTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

import Insight from './Insight/Insight';

import { propTypes } from 'react-native/Libraries/Components/Button';
// import Icon from 'react-native-vector-icons/Iconicons';

const TabBarComponent = props => {
  const { navigation } = props;
  const { routes } = navigation.state;
  const images = [require('../imgs/home.png'), require('../imgs/search.png'), require('../imgs/add.png'), require('../imgs/notifi.png'), require('../imgs/profile.png')]

  return (
    <ImageBackground {...props} style={{ width: "100%", height: 50, flexDirection: "row" }} source={require("../imgs/NavBar.png")}>
      {routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const scene = { route, focused };
        return (
          <TouchableOpacity {...props}
            style={{ width: "20%", alignItems: "center", marginTop: 10 }}
            key={route.key}
            onPress={() => props.onTabPress({ route })}
          >
            <Image
              style={{ width: 32, height: 32 }}
              source={images[index]} />
            {/* <Text>{route.routeName}</Text> */}
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

const hometabs = createBottomTabNavigator(
  {

    Poll: Poll,
    SearchTab: SearchTab,
    AddPollTab: AddPollTab,
    NotifiTab: NotifiTab,
    ProfileTab: ProfileTab,
  },
  {
    tabBarComponent: props =>
      <TabBarComponent {...props}
        style={{ backgroundColor: "transparent" }} />
  }
);


export default createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
    Poll: hometabs,
    Insight: Insight
  },
  {
    navigationOptions: {
      headerBackground:
        <Image
          style={{ width: "100%", height: 100 }}
          source={require("../imgs/Header.png")} />
    }
  }
);
