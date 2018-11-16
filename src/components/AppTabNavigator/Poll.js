import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { getFB } from "../firebase";
import { ChangePollID } from '../../actions/PollActions';
import { GetCity } from '../../actions/PollActions';

// var user = getUser();
var firebase = getFB();


class Poll extends React.Component {

  cdoc = null;

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.navigation.addListener("willFocus", () => {
      console.log("test");
      this.getPolls();
    })
  }

  state = {
    luser_id: [],
    ruser_id: [],
    location: ''
  };


  getPlace = async (lat, long) => {
    // Importing Our Long and Lat into Google maps
    var resp = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk");
    var place = await resp.json();

    console.log(place.results[8].address_components[0].long_name);
    var city = place.results[8].address_components[0].long_name;
    console.log(city)
    this.setState({
      location: this.state.city
    })

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getPlace(
          position.coords.latitude,
          position.coords.longitude
        )
      },
    );

  }


  // async componentDidMount() {
  //   if (App.shared.uid) {
  //     const res = await App.shared.getPolls();
  //   } else {
  //     firebase.auth().onAuthStateChanged(async polls => {
  //       if (polls) {
  //         const res = await App.shared.getPolls();
  //       }
  //     });
  //   }
  // }
  getPolls = async () => {


    var polls = firebase.firestore().collection("polls").orderBy("time", "desc").limit(1);

    polls.get().then((snap) => {
      snap.forEach((doc) => {
        this.cdoc = doc;

        //console.log(doc.data());
        var obj = doc.data();
        console.log(doc);
        this.props.dispatch(ChangePollID(doc.id));//dispatch action to change pollid
        this.setState({
          title: obj.title,
          desc: obj.desc,
          ldesc: obj.options.left.desc,
          rdesc: obj.options.right.desc,
          rimg: obj.options.right.img,
          limg: obj.options.left.img,
        });
      })
    })
    return false;

  }

  voteLeft = () => {
    // const { Lpoll } = this.state;
    // App.shared.voteLeft({
    //   Lpoll
    // });
    console.log("--------------------");
    // console.log(this.cdoc);
    var obj = this.cdoc.data();
    var arr = obj.votesL || [];

    console.log(this.props.dispatch(GetCity()));

    // console.log(this.props);
    var data = {
      user_id: this.props.user.user.uid,
      city: this.props.dispatch(GetCity()),//dispatch action to change pollid
      gender: this.props.gender,
      age: this.props.age

    }
    console.log(data);
    arr.push(this.props.user.user.uid);
    // console.log(obj);
    this.cdoc.ref.update({
      votesL: arr
    })
    //change pollid reducer
    this.props.navigation.navigate('Insight')
  }

  voteRight() {
    // const { Rpoll } = this.state;
    // App.shared.voteRight({
    //   Rpoll
    // });
    var obj = this.cdoc.data();
    var arr = obj.votesR || [];

    console.log(this.props.user.user.uid);
    arr.push(this.props.user.user.uid);
    console.log(arr);
    this.cdoc.ref.update({
      votesR: arr
    })

    this.props.navigation.navigate('Insight')
  }


  handleVote = () => {
    // var vote = this.props.curVote;
    this.props.navigation.navigate('Insight')
    // this.props.dispatch(addVote(vote))
  }

  render() {

    return (


      <ScrollView style={{ backgroundColor: "#fff" }}>

        {/* <ImageBackground
          style={{ width: "100%", height: "33%" }}
          source={require('../../imgs/Header2.png')}
        /> */}

        <View style={styles.container}>

          <View style={styles.title_container}>
            <Text style={styles.title}>{this.state.title}</Text>
          </View>

          <View style={styles.arg_container}>

            <TouchableOpacity
              style={styles.arg_btn}
              onPress={() => this.voteLeft()}
            >
              <ImageBackground
                style={styles.arg_img}
                source={{ uri: (this.state.limg) ? this.state.limg : "" }}
              >
                <View style={styles.arg_desc}>
                  <Text style={{ color: "#fff" }}>{this.state.ldesc}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.arg_btn}
              // onPress={() => {
              //   this.props.navigation.navigate('Insight')
              // }}
              onPress={() => this.voteRight()}
            >
              <ImageBackground
                style={styles.arg_img}
                source={{ uri: (this.state.rimg) ? this.state.rimg : "" }}
              >
                <View style={styles.arg_descR}>
                  <Text style={{ color: "#fff" }}>{this.state.rdesc}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.profile_container}>

            <Image
              style={{ width: 45, height: 45, marginLeft: 50 }}
              source={require('../../imgs/ProfileDefault.png')}
            />

            <Text style={styles.profile_name}>Profile Name</Text>

          </View>

          <Text style={styles.poll_Desc}>
            {this.state.desc}
          </Text>

          <Text
            style={{
              color: "gray",
              fontWeight: "700",
              fontSize: 17,
              marginBottom: -10,
              marginTop: 10
            }}>
            Live Debates
          </Text>

          <View style={styles.comment_container}>


            <Image
              style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20, marginRight: 10 }}
              source={require('../../imgs/ProfileDefault.png')}
            />
            <Text style={styles.poll_Desc}>
              asdfkhagdlsgblfavkgbvlbvalkjrbvlkjbvlbv
          </Text>

          </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: 80,
  },
  title: {
    fontSize: 30,
    color: "gray",
  },
  arg_container: {
    flexDirection: "row",
  },
  arg_btn: {
    width: 175,
    height: 350,
    margin: "2%",
  },
  arg_img: {
    backgroundColor: "lightgray",
    width: 175,
    height: "100%",

  },
  arg_desc: {
    backgroundColor: "#76BFB8",
    width: "80%",
    height: "50%",
    borderRadius: 10,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    padding: 30
  },
  arg_descR: {
    backgroundColor: "#e68267",
    width: "80%",
    height: "50%",
    borderRadius: 10,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    padding: 30
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#F9E7A2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 22,
  },
  profile_container: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  profile_img: {
    height: "10%",
    width: "10%",
    marginLeft: 30,

  },
  profile_name: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
  },
  poll_Desc: {
    width: "70%",
    marginTop: 15,
  },
  comment_container: {
    flexDirection: "row",
    width: "80%",
  }


});


const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth;

  return { ...auth };
};

export default connect(mapStateToProps)(Poll);
