import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, keyboardVerticalOffset,
} from 'react-native';
import { connect } from 'react-redux';
import { getFB } from "../firebase";
import { ChangePollID, ChangeIndex } from '../../actions/PollActions';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-container';




// var user = getUser();
var firebase = getFB();


class Poll extends React.Component {



  cdoc = null;
  city = null;
  allPolls = [];
  curIndex = 0;
  allComments = [];


  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.navigation.addListener("willFocus", () => {
      console.log("test poll");
      this.getPolls();
    })
    this.commentRef = getFB().firestore().collection("comment")
    this.message = "";
    this.pollid = "";
    this.userid = "";
    this.userimg = "";
    this.curUsername = "";
  }

  state = {
    luser_id: [],
    ruser_id: [],
    gestureName: 'none',
    allComments: [],
    message: "",
    more: false
    //Hello
  };

  handleSwipeL(gestureState) {
    alert('Right');
  }


  handleSwipe(gestureName, gestureState) {


    const { SWIPE_LEFT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_LEFT:
        this.curIndex = this.props.curIndex;
        this.curIndex++;
        this.props.dispatch(ChangePollID(this.allPolls[this.curIndex].doc_id));//dispatch action to change pollid
        this.props.dispatch(ChangeIndex(this.curIndex));
        this.setState({
          title: this.allPolls[this.curIndex].title,
          desc: this.allPolls[this.curIndex].desc,
          ldesc: this.allPolls[this.curIndex].options.left.desc,
          rdesc: this.allPolls[this.curIndex].options.right.desc,
          rimg: this.allPolls[this.curIndex].options.right.img,
          limg: this.allPolls[this.curIndex].options.left.img,
          username: this.allPolls[this.curIndex].username,
          userImg: this.allPolls[this.curIndex].userImg,
        });

        //this.getComments();
        break;
    }
  }


  getPlace = async (lat, long) => {

    var resp = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk");
    var place = await resp.json();

    // console.log(place);

    var placeArr = place.results[0].address_components.filter((obj, index) => {
      return obj.types.indexOf("locality") != -1;
    });

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

  getPolls = async () => {

    var polls = firebase.firestore().collection("polls").orderBy("time", "desc").limit(100);
    this.allPolls = [];
    polls.get().then((snap) => {
      snap.forEach((doc) => {
        //this.cdoc = doc;

        //console.log(this.cdoc);
        var obj = doc.data();
        obj.doc_id = doc.id;
        obj.cdoc = doc;
        console.log(obj.doc_id);
        this.allPolls.push(obj);
      })
      this.curIndex = this.props.curIndex;
      console.log(this.curIndex);

      this.props.dispatch(ChangePollID(this.allPolls[this.curIndex].doc_id));//dispatch action to change pollid
      this.setState({
        title: this.allPolls[this.curIndex].title,
        desc: this.allPolls[this.curIndex].desc,
        ldesc: this.allPolls[this.curIndex].options.left.desc,
        rdesc: this.allPolls[this.curIndex].options.right.desc,
        rimg: this.allPolls[this.curIndex].options.right.img,
        limg: this.allPolls[this.curIndex].options.left.img,
        username: this.allPolls[this.curIndex].username,
        userImg: this.allPolls[this.curIndex].userImg,
      });

      //this.getComments();
      getFB().firestore().collection("comment").where("pollid", "==", this.allPolls[this.curIndex].doc_id).onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
      }, (snaps) => {
        // ...
        //console.log(snaps);
        /*this.allComments.push(doc.data());
        this.setState({
          allComments: this.allComments
        })*/
        snaps.docChanges.forEach((change) => {
          if (change.type === "added") {
            this.allComments.push(change.doc.data());
            this.allComments.sort(this.customSort);
            this.setState({
              allComments: this.allComments
            })
          }
        });

      });
    })
    return false;

  }

  voteLeft = () => {

    console.log("--------------------");
    // console.log(this.cdoc);
    var obj = this.allPolls[this.curIndex];
    var arr = obj.votesL || [];
    var arr2 = obj.votesR || [];
    if (this.checkVoted(arr) !== false) {
      return;
    }

    var index = this.checkVoted(arr2);

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
    if (index !== false) {
      arr2.splice(index, 1)
    }

    this.allPolls[this.curIndex].cdoc.ref.update({
      votesL: arr,
      votesR: arr2
    })
    //change pollid reducer
    this.props.navigation.navigate('Insight')
  }

  voteRight() {

    var obj = this.allPolls[this.curIndex].cdoc.data();
    var arr = obj.votesR || [];
    var arr2 = obj.votesL || [];
    if (this.checkVoted(arr) !== false) {
      return;
    }

    var index = this.checkVoted(arr2);

    var dataR = {
      user_id: this.props.user.user.uid,
      city: this.city,
      gender: this.props.user.user.gender,
      age: this.props.user.user.age
    }
    console.log(dataR);
    arr.push(dataR);

    if (index !== false) {
      arr2.splice(index, 1)
    }

    console.log(arr);
    this.allPolls[this.curIndex].cdoc.ref.update({
      votesR: arr,
      votesL: arr2
    })
    this.props.navigation.navigate('Insight')
  }

  checkVoted = (arr) => {
    var exist = false;
    var index = null;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].user_id === this.props.user.user.uid) {
        index = i;
        exist = true; break;
      }
    }
    console.log(arr, exist, index);
    if (exist) {
      alert('YOU ALREADY VOTED!!!!');
      this.props.navigation.navigate('Insight')
      return index;
    } else {
      return false;
    }
  }

  handleVote = () => {
    // var vote = this.props.curVote;
    this.props.navigation.navigate('Insight')
    // this.props.dispatch(addVote(vote))
  }

  handleComment = async () => {
    console.log(this.props.user.user.pImg);
    await getFB().firestore().collection("comment").add({
      pollid: this.allPolls[this.curIndex].doc_id,
      userid: this.props.user.user._user.uid,
      curUsername: this.props.user.user.username,
      userimg: this.props.user.user.pImg,
      message: this.message,
      time: new Date(),
    })
    this.setState({
      message: ""
    })
    //this.getComments();
  }

  getComments = async () => {
    this.allComments = [];
    //var userids = [];
    var now = new Date();
    var snaps = await getFB().firestore().collection("comment").where("pollid", "==", this.allPolls[this.curIndex].doc_id).get();
    snaps.forEach((doc) => {
      console.log(doc.data());
      this.allComments.push(doc.data());
    })

    //sort by time
    this.allComments.sort(this.customSort)
    this.setState({
      allComments: this.allComments
    })

  }

  customSort(a, b) {
    if (a.time > b.time) {
      return 1
    }
    if (a.time < b.time) {
      return -1
    }
    return 0;
  }

  handleMore = () => {
    this.setState({
      more: !this.state.more
    })
  }

  render() {

    var comments = this.state.allComments.map((obj, index) => {
      return (

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image
            style={{ width: 20, height: 20, borderRadius: 10 }}
            source={(obj.userimg) ? { uri: obj.userimg } : require('../../imgs/ProfileDefault.png')}
            resizeMode='contain'
          // source={{ uri: (this.state.limg) ? this.state.limg : "" }}
          />

          {/* {obj.userimg} */}
          <Text style={{ marginLeft: 5 }}>
            <Text style={{ fontWeight: "700" }}>{obj.curUsername}  </Text>
            {obj.message}</Text>

        </View>

      )
    })

    var more = (
      <TouchableOpacity
        style={{ marginLeft: "-40%" }}
        onPress={this.handleMore}>
        <Text style={{ color: "#adadad", alignItems: 'flex-start', fontSize: 16, marginTop: 10 }}>See all comments...</Text>
      </TouchableOpacity>
    )

    if (this.state.more) {
      more = (
        <View style={{ width: "80%", marginBottom: 1000 }}>

          <View style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1.5,
            width: "100%",
            marginTop: 20
          }} />

          <Text
            style={{
              color: "gray",
              fontWeight: "600",
              fontSize: 17,
              marginBottom: -10,
              marginTop: 20,
              marginLeft: "10%"
            }}>
            Live Debates
              </Text>
          <View style={styles.comment_container}>

            {comments}
            {/* {this.state.curUsername}{this.state.message} */}

          </View>
          <View style={{ flexDirection: 'row', marginBottom: '10%' }}>

            <Image
              style={{ width: 30, height: 30, marginTop: 25, marginRight: 10, borderRadius: 15 }}
              source={(this.props.user.user.pImg) ? { uri: this.props.user.user.pImg } : require('../../imgs/ProfileDefault.png')}
            />

            <TextInput
              placeholder="Type Your Stance..."
              style={{
                marginTop: 20,
                width: "85%",
                height: 40,
                borderWidth: 1,
                borderColor: "lightgray",
                borderRadius: 50,
                paddingLeft: 20,
                paddingRight: 50,
              }}
              onChangeText={(text) => {
                this.message = text;
                this.setState({
                  message: text
                })
              }}
              value={this.state.message}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 30,
                right: 10,
                width: 50,
                height: 50
              }}
              onPress={this.handleComment}
            >
              <Text style={{ color: "#F9E7A2", fontWeight: "700", fontSize: 17 }}>Post</Text>
            </TouchableOpacity>

          </View>
        </View>
      )
    }

    return (

      <ScrollView style={{ backgroundColor: "#fff" }} >

        <View>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>


            <GestureRecognizer
              style={styles.container}
              // onSwipe={this.handleSwipe}
              onSwipe={(direction, state) => this.handleSwipe(direction, state)}
              onSwipeLeft={(state) => this.handleSwipeL(state)}
              velocityThreshold={0.5}
              distanceThreshold={80}
              angleThreshold={30}
            >

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
                  style={{ width: 45, height: 45, marginLeft: 50, borderRadius: 23 }}
                  source={(this.state.userImg) ? { uri: this.state.userImg } : require('../../imgs/ProfileDefault.png')}
                />

                <Text style={styles.profile_name}>{this.state.username}</Text>

              </View>

              <Text style={styles.poll_Desc}>
                {this.state.desc}
              </Text>


              {more}

              <View style={{ marginBottom: "10%" }}></View>

            </GestureRecognizer>

          </KeyboardAvoidingView>

        </View>

      </ScrollView >
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
    flexDirection: "column",
    width: "90%",
    marginTop: "5%"
  }


});


const mapStateToProps = ({ auth, vote }) => {

  return { ...auth, ...vote };
};

export default connect(mapStateToProps)(Poll);
