import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, Image } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { connect } from 'react-redux';
import { vote } from '../../actions';


class Insight extends React.Component {

  render() {

    const chart_wh = 250
    const series = [123, 321]
    const sliceColor = ['#e6826', '#76BFB8']

    return (
      <View style={styles.container}>

        <StatusBar
          hidden={true}
        />

        <Text style={styles.title}>{this.props.votes}</Text>
        <PieChart
          chart_wh={chart_wh}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.75}
          coverFill={'#FFF'}
        />

        {/* <Text>{this.props.vote.num}</Text> */}
        <Text>????????</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Dedails</Text>
        </TouchableOpacity>
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
  btn: {
    backgroundColor: "#F9E7A2",
    width: 160,
    height: 55,
    borderRadius: 15,
  },
  btnText: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    padding: 7,
    marginTop: 5,
  }

});

const mapStateToProps = ({ poll }) => {
  return { ...poll };
};

export default connect(mapStateToProps, { vote })(Insight);
