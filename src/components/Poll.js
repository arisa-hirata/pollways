import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
// import HomeTab from './AppTabNavigator/HomeTab';
// import SearchTab from './AppTabNavigator/HomeTab';
// import AddPollTab from './AppTabNavigator/AddPollTab';
// import NotifiTab from './AppTabNavigator/NotifiTab';
// import ProfileTab from './AppTabNavigator/ProfileTab';
import MainScreen from './MainScreen';


export default class Poll extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (

      <View>
        <MainScreen />
        {/* <BottomTabNavigator /> */}
      </View>


    );
  }
}

// const BottomTabNavigator = createBottomTabNavigator({
//   HomeTab: {
//     screen: HomeTab
//   },
//   SearchTab: {
//     screen: SearchTab
//   },
//   AddPollTab: {
//     screen: AddPollTab
//   },
//   NotifiTab: {
//     screen: NotifiTab
//   },
//   ProfileTab: {
//     screen: ProfileTab
//   }
// });

const styles = StyleSheet.create({


});
