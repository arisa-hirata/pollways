import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

import { connect } from 'react-redux';
import { vote } from '../../actions';
import { getFB } from "../firebase";


class Details extends React.Component {

  state = {
    lfemale: 0,
    rfemale: 0,
    lmale: 0,
    rmale: 0,
    lcity: {},
    rcity: {},
    // lage: {},
    // rage: {},
    lunderTwenty: 0,
    runderTwenty: 0,
    ltwenty: 0,
    rtwenty: 0,
    lthirty: 0,
    rthirty: 0,
    lforty: 0,
    rforty: 0,
    lfifty: 0,
    rfifty: 0,
    loverSixty: 0,
    roverSixty: 0


  }
  //lcity = {};
  //lcity["blah"] = 5;
  //{blah:5}
  componentWillMount() {
    var docRef = getFB().firestore().collection('polls').doc(this.props.pollid);
    docRef.get().then((doc) => {
      console.log(doc);
      // console.log(doc.data());

      let data = doc.data();
      console.log("data", data);

      var temp = this.state;
      for (var i = 0; i < data.votesL.length; i++) {
        var obj = data.votesL[i];
        console.log(obj);
        var city = obj.city/*.replace(/ /g, "_")*/;
        //in the render, reverse by replace(/_/g, " ");
        console.log(city);
        if (obj.gender == 'Male') {
          temp.lmale++;
        }

        if (obj.gender == 'Female') {
          temp.lfemale++;
        }

        if (obj.age == 'Under 20') {
          temp.lunderTwenty++;
        }

        if (obj.age == '20s') {
          temp.ltwenty++;
        }

        if (obj.age == '30s') {
          temp.lthirty++;
        }

        if (obj.age == '40s') {
          temp.lforty++;
        }

        if (obj.age == '50s') {
          temp.lfifty++;
        }

        if (obj.age == 'Over 60s') {
          temp.loverSixty++;
        }

        if (temp.lcity[city]) {
          temp.lcity[city]++;
        } else {
          temp.lcity[city] = 1;
        }

      }

      for (var i = 0; i < data.votesR.length; i++) {
        var obj = data.votesR[i];
        console.log(obj);
        if (obj.gender == 'Male') {
          temp.rmale++;
        }

        if (obj.gender == 'Female') {
          temp.rfemale++;
        }

        if (obj.age == 'Under 20') {
          temp.runderTwenty++;
        }

        if (obj.age == '20s') {
          temp.rtwenty++;
        }

        if (obj.age == '30s') {
          temp.rthirty++;
        }

        if (obj.age == '40s') {
          temp.rforty++;
        }

        if (obj.age == '50s') {
          temp.rfifty++;
        }

        if (obj.age == 'Over 60s') {
          temp.roverSixty++;
        }

        if (temp.rcity[city]) {
          temp.rcity[city]++;
        } else {
          temp.rcity[city] = 1;
        }


      }

      console.log(temp);
      console.log(temp.lmale);//左のmaleの投票した数
      console.log(temp.rmale);
      console.log(temp.lfemale);
      console.log(temp.rfemale);


      this.setState({
        lmale: temp.lmale,
        rmale: temp.rmale,
        lfemale: temp.lfemale,
        rfemale: temp.rfemale
      })

    })
  }

  render() {
    /*
    //console.log(this.props);
    var allcities = [];
    for (var key in this.state.lcity) {
      var val = this.state.lcity[key];
      //console.log(key, val);
    }
    */
    return (
      <View style={styles.container}>

        {/* <Text style={{
          zIndex: 99,
          position: "absolute",
          top: 25,
          fontSize: 45,
          color: "gray"
        }}>Insights</Text> */}

        <Text style={styles.headertxt}>Voters Demographic</Text>

        <View style={styles.border} />


        <Text style={styles.headertxt}>Gender</Text>

        <View style={{}}>
          <Text style={styles.contentTxt}>Female</Text>
          <Text>{this.state.lfemale},{this.state.rfemale}</Text>
          <Text style={styles.contentTxt}>Male</Text>
          <Text>{this.state.lmale},{this.state.rmale}</Text>
        </View>


        <Text style={styles.headertxt}>Top Locations</Text>
        <Text style={styles.contentTxt}>Vancouver</Text>
        <Text style={styles.contentTxt}>Richmond</Text>
        <Text style={styles.contentTxt}>Burnaby</Text>
        <Text style={styles.contentTxt}>Surrey</Text>



        <Text style={styles.headertxt}>Age Range</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.age_range}>Under 20</Text>
          <Text style={styles.age_range}>20S'</Text>
          <Text style={styles.age_range}>30S'</Text>
          <Text style={styles.age_range}>40S'</Text>
          <Text style={styles.age_range}>50S'</Text>
          <Text style={styles.age_range}>Over 60</Text>
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
    margin: 15,
    textAlign: 'left',
    position: 'relative',
    right: 100


  },
  age_range: {
    margin: 10,
    color: "#9A9A9A",
    marginTop: 90,

  }

});

const mapStateToProps = ({ vote }) => {
  return { ...vote };
};

export default connect(mapStateToProps, { vote })(Details);
