import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default class ProfileTab extends React.Component {

  state={
      userId: "Katie Munro",
      userLocation: 'Vancouver, British Columbia',
      userFriend: 164,
      totalVote: 100,
      totalWin: 60,
      progress: 20,
  }

// take total of votes divided by the total win or lost to get the result
//npm install --save react-native-progress-bar-animated


  render() {


    const barWidth = Dimensions.get('screen').width - 80;
 
    return (
      <ScrollView>
      <View style={styles.container}>
       
        {/* <View style={styles.topBar}>
          <View style={styles.topBarItem}>
            <View style={styles.topBarItemInner}>
              <View style={{paddingLeft: 25, marginTop: 20}}>
                <TouchableOpacity>
                <Image
                style={{width: 20, height: 20}}
                source={require('../../imgs/archive.png')}
                resizeMode="contain"
                />
                </TouchableOpacity>
                  </View>
                    </View>
                      </View>

          <View style={styles.topBarItem}>
            <View style={styles.topBarItemInner}>
                <TouchableOpacity onpress={this.changePage}>
                  <Text style={{textAlign: 'right', 
                  paddingRight: 25,marginTop: 20}}>Edit</Text>
                </TouchableOpacity>
                  </View>
                    </View>
                      </View> */}
{/* Profile Image**************************************************************************************** */}
        {/* <View style={styles.topProfileImg}>
          <View style={styles.ProfileImage}>
            <Image 
            style={{width: 230, height: 230}}
            source={require('../../imgs/userImg.png')}
            resizeMode = 'contain'
            />
          </View>
        </View> */}
{/* username Input**************************************************************************************** */}
        {/* <View style={styles.nameInput}>
            <Text style={{fontSize: 25}}>{this.state.userId}</Text>
        </View> */}
{/* location Input**************************************************************************************** */}
        {/* <View style={styles.locationInput}>
            <Text style={{fontSize: 16}}>{this.state.userLocation}</Text>
        </View> */}
{/* user friend number**************************************************************************************** */}
        {/* <View style={styles.userFriend}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.userFriend}</Text>
        </View>

        <View style={styles.userFriend}>
            <Text style={{fontSize: 15}}>Poll Mates</Text>
        </View> */}

{/* **************************************************************************************** */}

{/* <View style={{width:'100%', height:'10%', backgroundColor:'#E2FFE8', justifyContent: 'center'}}>
<Text>Winning Bar </Text>
</View> */}

{/* **************************************************************************************** */}
         {/* <View style={styles.pollBar}>
          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{}}>My Polls</Text>
                </View>
                  </View>

          <View style={styles.pollBarItem}>
            <View style={[styles.pollBarItemInner, {alignItems:'flex-end'}]}>
              <View style={{width:20, height:20,justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity>
                <Image
                style={{width: 10, height: 10}}
                source={require('../../imgs/add1.png')}
                />
                </TouchableOpacity>
              </View>
                </View>
                  </View>
                    </View> */}
{/* **************************************************************************************** */}
        {/* <View style={styles.currentPoll}>
          <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner}>
              <Image 
                style={{width: 200, height: 200}}
                source={require('../../imgs/donut.jpg')}
                 resizeMode = 'contain'
              />
            </View>
              <View style={styles.currentPollItemInner}>
              <Image 
            style={{width: 200, height: 200}}
            source={require('../../imgs/cupcake.jpg')}
            resizeMode = 'contain'
            />
              </View>
              </View>

          <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner}>
            </View>
          </View>

           <View style={styles.currentPollItem}>
            <View style={styles.currentPollItemInner}>
            </View>
          </View>
        </View> */}
{/* **************************************************************************************** */}
        {/* <View style={styles.pollBar}>
          <View style={styles.pollBarItem}>
            <View style={styles.pollBarItemInner}>
              <Text style={{}}>Group polls</Text>
                </View>
                  </View>

          <View style={styles.pollBarItem}>
            <View style={[styles.pollBarItemInner, {alignItems:'flex-end'}]}>
              <View style={{width:20, height:20,justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity>
                <Image
                style={{width: 10, height: 10}}
                source={require('../../imgs/add1.png')}
                />
                </TouchableOpacity>
              </View>
                </View>
                  </View>
                    </View> */}
{/* **************************************************************************************** */}
         {/* <View style={styles.groupPoll}>
          <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner}>
              <Image 
                style={{width: 200, height: 200}}
                source={require('../../imgs/donut.jpg')}
                 resizeMode = 'contain'
              />
            </View>
              <View style={styles.groupPollItemInner}>
              <Image 
            style={{width: 200, height: 200}}
            source={require('../../imgs/cupcake.jpg')}
            resizeMode = 'contain'
            />
              </View>
              </View>

          <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner}>
            </View>
          </View>

           <View style={styles.groupPollItem}>
            <View style={styles.groupPollItemInner}>
            </View>
          </View>
        </View> */}
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
// ARCHIVE AND EDIT SECTION********************************************************************
topBar:{
  height: '5%',
  flexDirection: 'row',
  flexWrap: 'wrap',
},
topBarItem: {
  width: '50%',
},
topBarItemInner: {
  flex: 1,
},
// ********************************************************************
  topProfileImg: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    },
  locationInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    },
  userFriend: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    },

// ********************************************************************
    pollBar:{
      width: '80%',
      flexDirection: 'row',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    pollBarItem: {
      width: '50%',
    },
    pollBarItemInner: {
      flex: 1,
    },
// ********************************************************************
    currentPoll: {
      height: '15%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 5,
      marginBottom: 10,
      overflow: 'hidden',
    },
    currentPollItem: {
      width: '30%',
      height:'100%',
      flexDirection: 'row',
      padding: 5,
      overflow: 'hidden',
    },
    currentPollItemInner: {
      flex: 1,
      backgroundColor: '#292929',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    // ********************************************************************
    groupPoll: {
      height: '15%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 5,
      backgroundColor: '#FDF2E9'
    },
    groupPollItem: {
      width: '30%',
      height:'100%',
      flexDirection: 'row',
      padding: 5,
    },
    groupPollItemInner: {
      flex: 1,
      backgroundColor: '#292929',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    }




});

