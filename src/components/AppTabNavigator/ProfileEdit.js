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

});

