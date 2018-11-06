import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, Button, TouchableOpacity, ImageBackground } from "react-native";

export default class ProfileTab extends React.Component {
  state = {
    userId: "Katie Munro",
    userLocation: "Vancouver, British Columbia",
    userFriend: 164,
    totalVote: 100,
    totalWin: 60,
    progress: 20
  };

  render() {
    const barWidth = Dimensions.get("screen").width - 80;

    return (
      <View style={styles.container}>

        <ImageBackground
          style={{ width: "100%", height: 70 }}
          source={require('../../imgs/Header.png')}
        />


        <View style={styles.top}>
          <View style={styles.topBar}>
            <View style={styles.topBarItem}>
              <View style={styles.topBarItemInner}>
                <Text style={{ paddingLeft: 25 }}>Archive</Text>
              </View>
            </View>

            <View style={styles.topBarItem}>
              <TouchableOpacity
                style={styles.topBarItemInner}
                onPress={() => {
                  this.props.navigation.navigate("EditProfile");
                }}
              >
                <Text style={{ textAlign: "right", paddingRight: 25 }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* **************************************************************************************** */}
          <View style={styles.ProfileImage}>
            <Image style={{ width: 230, height: 230 }} source={require("../../imgs/userImg.png")} resizeMode="contain" />
          </View>
        </View>
        {/* **************************************************************************************** */}
        <View style={styles.nameInput}>
          <Text style={{ fontSize: 25 }}>{this.state.userId}</Text>
        </View>

        <View style={styles.locationInput}>
          <Text style={{ fontSize: 16 }}>{this.state.userLocation}</Text>
        </View>

        <View style={styles.userFriend}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{this.state.userFriend}</Text>
        </View>
        {/* **************************************************************************************** */}
        <View style={styles.pollBar}>
          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{}}>Polls</Text>
            </View>
          </View>

          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{ textAlign: "right" }}>+</Text>
            </View>
          </View>
        </View>
        {/* **************************************************************************************** */}
        <View style={styles.currentPoll}>
          <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner}>
              <Image style={{ width: 200, height: 200 }} source={require("../../imgs/donut.jpg")} resizeMode="contain" />
            </View>
            <View style={styles.currentPollItemInner}>
              <Image style={{ width: 200, height: 200 }} source={require("../../imgs/cupcake.jpg")} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner} />
          </View>

          <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner} />
          </View>
        </View>
        {/* **************************************************************************************** */}
        <View style={styles.pollBar}>
          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{}}>Group polls</Text>
            </View>
          </View>

          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{ textAlign: "right" }}>+</Text>
            </View>
          </View>
        </View>
        {/* **************************************************************************************** */}
        <View style={styles.groupPoll}>
          <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner}>
              <Image style={{ width: 200, height: 200 }} source={require("../../imgs/donut.jpg")} resizeMode="contain" />
            </View>
            <View style={styles.groupPollItemInner}>
              <Image style={{ width: 200, height: 200 }} source={require("../../imgs/cupcake.jpg")} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner} />
          </View>

          <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFF"
  },

  top: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center"
  },
  ProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  nameInput: {
    alignItems: "center",
    justifyContent: "center"
  },
  locationInput: {
    alignItems: "center",
    justifyContent: "center"
  },
  userFriend: {
    alignItems: "center",
    justifyContent: "center"
  },

  // ********************************************************************
  topBar: {
    height: "10%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  topBarItem: {
    width: "50%",
    padding: 5
  },
  topBarItemInner: {
    flex: 1
  },
  // ********************************************************************
  pollBar: {
    height: "5%",
    width: "75%",
    flexDirection: "row",
    borderBottomWidth: 1
  },
  pollBarItem: {
    width: "50%",
    padding: 5
  },
  pollBarItemInner: {
    flex: 1
  },
  // ********************************************************************
  currentPoll: {
    height: "18%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5
  },
  currentPollItem: {
    width: "25%",
    height: "100%",
    flexDirection: "row",
    padding: 5
  },
  currentPollItemInner: {
    flex: 1,
    backgroundColor: "#292929",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  // ********************************************************************
  groupPoll: {
    height: "18%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5
  },
  groupPollItem: {
    width: "25%",
    height: "100%",
    flexDirection: "row",
    padding: 5
  },
  groupPollItemInner: {
    flex: 1,
    backgroundColor: "#292929",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  }
});
