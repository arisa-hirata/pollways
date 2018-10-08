import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/HomeTab';
import AddPollTab from './AppTabNavigator/AddPollTab';
import NotifiTab from './AppTabNavigator/NotifiTab';
import ProfileTab from './AppTabNavigator/ProfileTab';



export default class Poll extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (

      <ScrollView style={styles.container}>

        <View style={styles.title_container}>
          <Text style={styles.title}>Title</Text>
        </View>

        <View style={styles.arg_container}>
          <View style={styles.arg_img}>
            <View style={styles.arg_desc}>

            </View>
          </View>

          <View style={styles.arg_img}>
            <View style={styles.arg_desc}>

            </View>
          </View>
        </View>

        <View style={styles.profile_container}>
          <View style={styles.profile_img}></View>
          <Text style={styles.profile_name}>Profile Name</Text>
          <View style={styles.favorite_Btn}></View>
          <View style={styles.insight_Btn}></View>
        </View>

        <Text style={styles.poll_Desc}>
          asdfkhagdlsgblfavkgbvlbvalkjrbvlkjbvlbv
          </Text>

        <View style={styles.comment_container}>
          <View style={styles.profile_img}></View>
          <Text style={styles.poll_Desc}>
            asdfkhagdlsgblfavkgbvlbvalkjrbvlkjbvlbv
          </Text>

        </View>

      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    //   flex: 1,
    backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // title_container: {
    //   width: 100,
    //   height: 50,
  },
  title: {
    fontSize: 30,
    color: "gray",
  },
  arg_container: {
    flexDirection: "row",
  },
  arg_img: {
    backgroundColor: "lightgray",
    width: "45%",
    height: 350,
    margin: "2%",
  },
  arg_desc: {
    backgroundColor: "#76BFB8",
    width: "90%",
    height: "50%",
    borderRadius: 10,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',


  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#F9E7A2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 22,
  },
  profile_container: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  profile_img: {
    backgroundColor: "lightgray",
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 30,

  },
  profile_name: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
  },
  favorite_Btn: {
    backgroundColor: "lightgray",
    height: 30,
    width: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    margin: 10,
    marginLeft: 100,
  },
  insight_Btn: {
    backgroundColor: "lightgray",
    height: 30,
    width: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  poll_Desc: {
    width: "70%",
    marginTop: 15,
  },
  comment_container: {
    flexDirection: "row",
    width: "80%",
  }


});
