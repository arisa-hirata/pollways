import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CameraRoll, ScrollView } from 'react-native';

import firebase from 'firebase';
import "firebase/firestore";

import { connect } from 'react-redux';
import { ChangeFb } from '../../actions';

import Poll from './Poll';

class AddPollTab extends React.Component {

  title = "";
  desc = '';

  AddImg = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  handlePoll = () => {
    //this.handleGet(); return;
    this.props.navigation.navigate('Poll');

    var col = firebase.firestore().collection("polls").add({
      title: this.title,
      desc: this.desc,
      img: null,
      time: new Date(),
      options: {
        left: {
          title: "sushi",
          desc: this.ldesc,
          img: null
        },
        right: {
          title: "pie",
          desc: this.rdesc,
          img: null
        }
      }
    }).then(() => {
      //navigate to home page
    });
    console.log(col);
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 50 }}>Create</Text>
        <TextInput
          placeholder="Type Title here..."
          onChangeText={(text) => { this.title = text }}
        />

        <View style={styles.arg_container}>

          <View style={styles.arg_img}>
            <TouchableOpacity
              onPress={this.AddImg}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
              onChangeText={(text) => { this.ldesc = text }}
            />


          </View>

          <View style={styles.arg_img}>

            <TouchableOpacity
              onPress={this.AddImg}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
              onChangeText={(text) => { this.rdesc = text }}
            />

            {/* <ScrollView>
              {this.state.photos.map((p, i) => {
                return (
                  <Image
                    key={i}
                    style={{
                      width: 300,
                      height: 100,
                    }}
                    source={{ uri: p.node.image.uri }}
                  />
                );
              })}
            </ScrollView> */}


          </View>
        </View>

        <TextInput
          style={styles.poll_desc}
          placeholder="Give your poll a description..."
          onChangeText={(text) => { this.desc = text }}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={this.handlePoll}
        >
          <Text style={styles.btnText}>Launch Poll</Text>
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
  arg_container: {
    flexDirection: "row",
  },
  arg_img: {
    backgroundColor: "lightgray",
    width: "45%",
    height: 350,
    margin: "2%",
  },
  plus: {
    color: '#fff',
    fontSize: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 130,
  },
  arg_desc: {
    backgroundColor: "#fff",
    width: "70%",
    height: 80,
    borderRadius: 7,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '30%'
  },
  poll_desc: {
    height: 80,
    width: 150,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 7,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#F9E7A2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
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

function mapStateToProps(state) {
  return {
    //SaveProfile:state.Profile.SaveProfile
  }
}

export default connect(mapStateToProps)(AddPollTab);
