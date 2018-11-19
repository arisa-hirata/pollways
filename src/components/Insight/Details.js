import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';

import { StackedBarChart } from 'react-native-svg-charts'
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
        rfemale: temp.rfemale,
        lunderTwenty: temp.lunderTwenty,
        runderTwenty: temp.runderTwenty,
        ltwenty: temp.ltwenty,
        rtwenty: temp.rtwenty,
        lthirty: temp.lthirty,
        rthirty: temp.rthirty,
        lforty: temp.lforty,
        rforty: temp.rforty,
        lfifty: temp.lfifty,
        rfifty: temp.rfifty,
        loverSixty: temp.loverSixty,
        roverSixty: temp.roverSixty
      })

    })
  }

  render() {

    console.log(this.props);
    var allcities = [];
    for (var key in this.state.lcity) {
      var val = this.state.lcity[key];
      console.log(key, val);
      console.log(key);
      console.log(val);

      const _ = require('lodash');
      let obj = {
        lcity: { key: val },
        rcity: { "San Francisco": 3, "Barnaby": 10 }
      }
      console.log(obj.lcity)
      let b = _.mergeWith({ ...obj.lcity }, { ...obj.rcity }, (a, b) => ((a || 0) + (b || 0)))
      let c = _.merge(obj.lcity, obj.rcity)

      let d = _.keys(b)

      for (let t of d) {
        console.log(t + ":" + b[t] + ":" + c[t])
      }
    }

    allcities.push(key);
    console.log(allcities);

    const _ = require('lodash');
    let obj = {
      lcity: { allcities: val },
      rcity: { "San Francisco": 3, "Barnaby": 10 }
    }
    console.log(obj.lcity)
    let b = _.mergeWith({ ...obj.lcity }, { ...obj.rcity }, (a, b) => ((a || 0) + (b || 0)))
    let c = _.merge(obj.lcity, obj.rcity)

    let d = _.keys(b)

    for (let t of d) {
      console.log(t + ":" + b[t] + ":" + c[t])
    }


    const gender = [
      {
        lgender: this.state.lfemale,
        rgender: this.state.rfemale,
      },
      {
        lgender: this.state.lmale,
        rgender: this.state.rmale,
      }
    ]
    const data3 = [
      {
        left3: 840,
        right3: 920,
      }
    ]
    const age = [
      {
        lage: this.state.lunderTwenty,
        rage: this.state.runderTwenty,
      },
      {
        lage: this.state.ltwenty,
        rage: this.state.rtwenty,
      },
      {
        lage: this.state.lthirty,
        rage: this.state.rthirty,
      },
      {
        lage: this.state.lforty,
        rage: this.state.rforty,
      },
      {
        lage: this.state.lfifty,
        rage: this.state.rfifty,
      },
      {
        lage: this.state.loverSixty,
        rage: this.state.roverSixty,
      }

    ]

    const colors = ['#84C2BD', '#D8866D']
    const genderKey = ['lgender', 'rgender']
    const ageKey = ['lage', 'rage']


    const locations = ['left2', 'right2']
    const keys3 = ['left3', 'right3']



    return (

      <ScrollView style={{ backgroundColor: '#fff', }}>
        <View style={styles.container}>

          <Text style={styles.headertxt}>Voters Demographic</Text>

          <View style={styles.border} />


          <Text style={styles.headertxt}>Gender</Text>

          <View style={{}}>

            <View style={{ flexDirection: 'row', marginBottom: -10 }}>
              <View>
                <Text style={styles.contentTxt}>Female</Text>
                <Text style={styles.contentTxt}>Male</Text>
              </View>
              <View>
                <StackedBarChart
                  style={styles.barchart}
                  keys={genderKey}
                  colors={colors}
                  data={gender}
                  horizontal={true}
                  showGrid={false}
                  contentInset={{ bottom: 30 }}
                />
              </View>
            </View>

            {/* <View style={{ flexDirection: 'row', marginTop: -20 }}>

            <StackedBarChart
              style={styles.barchart}
              keys={maleKey}
              colors={colors}
              data={male}
              horizontal={true}
              showGrid={false}
              contentInset={{ bottom: 30 }}
            />
          </View> */}
          </View>


          <Text style={styles.headertxt}>Top Locations</Text>
          <Text style={styles.contentTxt}>{}</Text>
          <Text style={styles.contentTxt}>Richmond</Text>
          <Text style={styles.contentTxt}>Burnaby</Text>
          <Text style={styles.contentTxt}>Surrey</Text>



          <Text style={styles.headertxt}>Age Range</Text>




          <StackedBarChart
            style={{ width: 300, height: 140, marginTop: 20, marginBottom: -20 }}
            keys={ageKey}
            colors={colors}
            data={age}
            horizontal={false}
            showGrid={false}
            contentInset={{ bottom: 30 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.age_range}>Under 20</Text>
            <Text style={styles.age_range}>20S'</Text>
            <Text style={styles.age_range}>30S'</Text>
            <Text style={styles.age_range}>40S'</Text>
            <Text style={styles.age_range}>50S'</Text>
            <Text style={styles.age_range}>Over 60</Text>
          </View>

        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,

    alignItems: 'center',

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
    width: "80%",

  },
  contentTxt: {
    color: "#9A9A9A",
    fontSize: 14,
    margin: 10,
    marginRight: 0,
    textAlign: 'left',
    width: 80
  },
  age_range: {
    margin: 10,
    color: "#9A9A9A",
  },
  barchart: {
    width: 200,
    paddingBottom: 10,
    height: 90,
    margin: 5,
    marginTop: 12,
  }

});

const mapStateToProps = ({ vote }) => {
  return { ...vote };
};

export default connect(mapStateToProps, { vote })(Details);
