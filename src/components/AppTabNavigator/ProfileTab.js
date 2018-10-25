import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

export default class ProfileTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "Katie Munro",
      userLocation: 'Vancouver, British Columbia',
      userFriend: 164,
      totalVote: 100,
      totalWin: 60,
      progress: 20,

    };
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  }

// take total of votes divided by the total win or lost to get the result
//npm install --save react-native-progress-bar-animated


  render() {
    const barWidth = Dimensions.get('screen').width - 80;
 
    return (
      <View style={styles.container}>
      <View>
      <Image 
          style={{width: 200, height: 200}}
          source={require('../../imgs/userImg.png')}
          resizeMode="contain"
          />
      </View>

      <View>
          <Text>{this.state.userId}</Text>
          <Text>{this.state.userLocation}</Text>
          <Text>{this.state.userFriend}</Text>
          <Text>Poll Mates</Text>  
      </View>


          <Text>Percentage of Total Wins</Text>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
          />

          <View style={styles.pollcontainer}>
          <Text>My Polls</Text>
          </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 15,
  },
  pollcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
