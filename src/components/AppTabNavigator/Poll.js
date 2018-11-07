import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import { connect } from 'react-redux';
import { vote } from '../../actions';
import { addVote } from '../../actions/PollActions';

import firebase from 'firebase';
import 'firebase/firestore';

import App from '../../../App';




class Poll extends React.Component {


  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.navigation.addListener("willFocus", () => {
      console.log("test");
      this.getPolls();
    })
  }

  state = {
    Lpoll: 'LLLLLL',
    title: ""
  };

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
        //console.log(doc.data());
        var obj = doc.data();
        this.setState({
          title: obj.title,
          desc: obj.desc,
          ldesc: obj.options.left.desc,
          rdesc: obj.options.right.desc
        });
      })
    })
    return false;

  }


  // ref = firebase.storage().ref().child('img/sample.jpg');
  // ref.getDownloadURL().then((url) => {
  //   document.getElementById('image').src = url;
  // });


  voteLeft() {
    const { Lpoll } = this.state;
    App.shared.voteLeft({
      Lpoll
    });
    this.props.navigation.navigate('Insight')
  }

  voteRight() {
    const { Rpoll } = this.state;
    App.shared.voteRight({
      Rpoll
    });
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

        <ImageBackground
          style={{ width: "100%", height: 70 }}
          source={require('../../imgs/Header.png')}
        />

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

              >
                <View style={styles.arg_desc}>
                  <Text>{this.state.ldesc}</Text>
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

              >
                <View style={styles.arg_descR}>
                  <Text>{this.state.rdesc}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.profile_container}>
            <View style={styles.profile_img}></View>
            <Text style={styles.profile_name}>Profile Name</Text>

          </View>

          <Text style={styles.poll_Desc}>
            {this.state.desc}
          </Text>

          <View style={styles.comment_container}>
            <View style={styles.profile_img}></View>
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
    justifyContent: 'center',
  },
  title_container: {
    width: 100,
    height: 50,
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
    height: 350,

  },
  arg_desc: {
    backgroundColor: "#76BFB8",
    width: "90%",
    height: "50%",
    borderRadius: 10,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  arg_descR: {
    backgroundColor: "#e68267",
    width: "90%",
    height: "50%",
    borderRadius: 10,
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
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
    backgroundColor: "lightgray",
    height: 50,
    width: 50,
    borderRadius: 50,
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


const mapStateToProps = ({ poll }) => {
  // const { email, password, error, loading, user } = auth;

  return { ...poll };
};

export default connect(mapStateToProps, { vote })(Poll);

// Fire.shared = new Fire();

// mapStateToProps = (state) => {
//   return {
//     curVote: state.Poll.curVote
//   };
// }

// export default connect(mapStateToProps)(Poll);
