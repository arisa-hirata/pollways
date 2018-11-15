import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

import { connect } from 'react-redux';



class Details extends React.Component {


  render() {

    return (
      <View style={styles.container}>

        <Text style={{
          zIndex: 99,
          position: "absolute",
          top: 25,
          fontSize: 45,
          color: "gray"
        }}>Insights</Text>

        <Text style={styles.headertxt}>Voters Demographic</Text>

        <View style={styles.border} />

        <Text style={styles.headertxt}>Gender</Text>
        <Text style={styles.contentTxt}>Female</Text>
        <Text style={styles.contentTxt}>Male</Text>

        <Text style={styles.headertxt}>Top Locations</Text>
        <Text style={styles.contentTxt}>Vancouver</Text>
        <Text style={styles.contentTxt}>Richmond</Text>
        <Text style={styles.contentTxt}>Burnaby</Text>
        <Text style={styles.contentTxt}>Surrey</Text>

        <Text style={styles.headertxt}>Age Range</Text>

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
  border: {
    borderBottomColor: '#9A9A9A',
    borderBottomWidth: 1,
    width: "80%",
    margin: 20,
  },
  headertxt: {
    color: "#9A9A9A",
    fontSize: 18,
    justifyContent: 'flex-start',
    width: "80%"
  },
  contentTxt: {
    color: "#9A9A9A",
    fontSize: 14,
    margin: 10
  }

});

function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Details);
