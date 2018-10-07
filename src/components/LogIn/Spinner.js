import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component {

  render() {
    return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator />
      </View>
    );
  }

}



const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
