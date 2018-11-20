import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground, Image } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { getFB } from "../firebase";

import { connect } from 'react-redux';
import { vote } from '../../actions';
//import { LVoteTotal } from '../../actions';

class Insight extends React.Component {

  // cdoc = null;

  constructor(props) {
    super(props)
    this.pollsRef = getFB().firestore().collection("polls")
  }

  state = {
    luser_id: [],
    ruser_id: [],
    votesL: 0,
    votesR: 0,
  };

  componentWillMount() {
    var docRef = getFB().firestore().collection('polls').doc(this.props.pollid);
    docRef.get().then((doc) => {
      console.log(doc);
      // console.log(doc.data());

      let data = doc.data();
      console.log("data", data);
      console.log(data.votesL);
      console.log(data.votesR);

      this.setState({
        votesL: data.votesL.length,
        votesR: data.votesR.length
      });
    })
  }



  render() {
    // console.log(this.props.user.user.uid);
    const chart_wh = 250
    const series = [this.state.votesR, this.state.votesL]
    console.log(series);
    const sliceColor = ['#e68266', '#76BFB8']
    //console.log(this.props);
    //LVoteTotal(this.props.pollid);
    var total = this.state.votesR + this.state.votesL
    var perc = 0;
    var pc = null;
    if (total > 1) {
      perc = parseInt(this.state.votesR / total * 100);
      pc = <PieChart
        style={{ position: 'absolute', top: 80 }}
        chart_wh={chart_wh}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.75}
        coverFill={'#FFF'}
      />
    } else if (this.state.votesR == 0 && this.state.votesL > 0) {
      perc = 0;
      pc = <PieChart
        style={{ position: 'absolute', top: 80 }}
        chart_wh={chart_wh}
        series={[0, 100]}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.75}
        coverFill={'#FFF'}
      />
    } else {
      perc = 100;
      pc = <PieChart
        style={{ position: 'absolute', top: 80 }}
        chart_wh={chart_wh}
        series={[100, 0]}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.75}
        coverFill={'#FFF'}
      />
    }

    return (
      <View style={styles.container}>

        <StatusBar
          hidden={true}
        />

        <Text style={styles.title}>{this.props.votes}</Text>
        {pc}

        {/* <Text>{this.props.vote.num}</Text> */}
        <Text
          style={{
            fontSize: 60,
            margin: 10,
            color: '#e68266',
            position: 'absolute',
            top: 160
          }}>{perc}%</Text>

        <Text
          style={{
            fontSize: 30,
            margin: 10,
            position: 'absolute',
            top: 350,
            fontWeight: "700",
            color: 'gray'
          }}>Votes: {total}</Text>

        <TouchableOpacity style={styles.btn}>
          <Text
            style={styles.btnText}
            onPress={() => { this.props.navigation.navigate('Details') }}
          >View Details</Text>
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
    position: 'absolute',
    top: 420,
  },
  btnText: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    padding: 7,
    marginTop: 5,
  }

});

const mapStateToProps = ({ vote }) => {
  return { ...vote };
};

export default connect(mapStateToProps, { vote })(Insight);
