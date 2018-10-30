import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { vote } from '../../actions';
import { addVote } from '../../actions/PollActions';

import firebase from 'firebase';
import 'firebase/firestore';

import App from '../../../App';




class Poll extends React.Component {




  state = {
    Lpoll: 'LLLLLL',
    Rpoll: 'RRRRRR'
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
      <ScrollView style={styles.container}>

        <View style={styles.title_container}>
          <Text style={styles.title}>Title</Text>
        </View>

        <View style={styles.arg_container}>
          <TouchableOpacity
            style={styles.arg_img}
            onPress={() => this.voteLeft()}
          >
            <View style={styles.arg_desc}>

            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.arg_img}
            // onPress={() => {
            //   this.props.navigation.navigate('Insight')
            // }}
            onPress={() => this.voteRight()}
          >

            <View style={styles.arg_descR}>

            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.profile_container}>
          <View style={styles.profile_img}></View>
          <Text style={styles.profile_name}>Profile Name</Text>
          <View style={styles.favorite_Btn}></View>
          <View style={styles.insight_Btn}></View>
        </View>

        <Text style={styles.poll_Desc}>
          asdfkhagdlsgblfavkgbvlbvalkjrbvlkjbvlbv
          </Text>

        <View style={styles.comment_container}>
          <View style={styles.profile_img}></View>
          <Text style={styles.poll_Desc}>
            asdfkhagdlsgblfavkgbvlbvalkjrbvlkjbvlbv
          </Text>

        </View>

      </ScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // title_container: {
    //   width: 100,
    //   height: 50,
  },
  title: {
    fontSize: 30,
    color: "gray",
  },
  arg_container: {
    flexDirection: "row",
  },
  arg_img: {
    backgroundColor: "lightgray",
    width: "45%",
    height: 350,
    margin: "2%",
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
  favorite_Btn: {
    backgroundColor: "lightgray",
    height: 30,
    width: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    margin: 10,
    marginLeft: 100,
  },
  insight_Btn: {
    backgroundColor: "lightgray",
    height: 30,
    width: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
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
