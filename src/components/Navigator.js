import React, { Component } from 'react';
import { StyleSheet, Image, ImageBackground, Text } from 'react-native';
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

const TabBarComponent = props => {
  const { navigation } = props;
  const { routes } = navigation.state;

  return (
    <ImageBackground {...props} style={{ width: "100%", height: 50, flexDirection: "row" }} source={require("../imgs/NavBar.png")}>
      {routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const scene = { route, focused };
        return (
          <Text {...props} style={{ width: "20%" }} key={route.key} onPress={() => props.onTabPress({ route })}>
            {route.routeName}
          </Text>
        );
      })}
    </ImageBackground>
  );
};

const polltabs = createBottomTabNavigator(
  {

    HomeTab: Poll,
    SearchTab: SearchTab,
    AddPollTab: AddPollTab,
    NotifiTab: NotifiTab,
    ProfileTab: ProfileTab,
  },
  {
    tabBarComponent: props => <TabBarComponent {...props} style={{ backgroundColor: "transparent" }} />
  }
);

export default createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
    Poll: polltabs,
  },
  {
    navigationOptions: {
      headerBackground: <Image style={{ width: "100%", height: 100 }} source={require("../imgs/NavBar.png")} />
    }
  }
);

const styles = StyleSheet.create({
  bottomBG: {
    height: 100,
    width: 100,
    position: "absolute",
  }
});
