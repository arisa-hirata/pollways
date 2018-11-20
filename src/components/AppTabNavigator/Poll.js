import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { getFB } from "../firebase";
import { ChangePollID } from '../../actions/PollActions';


// var user = getUser();
var firebase = getFB();


class Poll extends React.Component {

  cdoc = null;
  city = null;

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.navigation.addListener("willFocus", () => {
      console.log("test");
      this.getPolls();
      this.getProfile();
    })
  }

  state = {
    luser_id: [],
    ruser_id: [],
    //Hello
  };


  getPlace = async (lat, long) => {

    var resp = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk");
    var place = await resp.json();

    // console.log(place);
    // console.log(place.plus_code.compound_code[1]);
    // console.log(place.results[8].address_components[0].long_name);
    var placeArr = place.results[0].address_components.filter((obj, index) => {
      return obj.types.indexOf("locality") != -1;
    });

    console.log(placeArr[0].long_name);
    var city = placeArr[0].long_name
    this.city = city;
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
          username: obj.username
        });
      })
    })
    return false;

  }

  getProfile = async () => {

    var profile = firebase.firestore().collection("profile")
    console.log(profile);
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

    console.log(this.props);
    var dataL = {
      user_id: this.props.user.user.uid,
      city: this.city,
      gender: this.props.user.user.gender,
      age: this.props.user.user.age
    }
    console.log(dataL);
    arr.push(dataL);
    // console.log(obj);
    this.cdoc.ref.update({
      votesL: arr
    })
    //change pollid reducer
    this.props.navigation.navigate('Insight')
  }

  voteRight() {

    var obj = this.cdoc.data();
    var arr = obj.votesR || [];

    var dataR = {
      user_id: this.props.user.user.uid,
      city: this.city,
      gender: this.props.user.user.gender,
      age: this.props.user.user.age
    }
    console.log(dataR);
    arr.push(dataR);

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

            <Text style={styles.profile_name}>{this.state.username}</Text>

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

  return { ...auth };
};

export default connect(mapStateToProps)(Poll);
