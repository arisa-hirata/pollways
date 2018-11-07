import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CameraRoll, ScrollView, ImageBackground } from 'react-native';

import { getApp, getFB } from "../firebase";

import { connect } from 'react-redux';
import { ChangeFb } from '../../actions';
import ImagePicker from 'react-native-image-crop-picker';

//accessing from FireBase
var storage = getApp().storage();
var firebase = getFB();
class AddPollTab extends React.Component {

  title = "";
  desc = '';
  img = null

  state = {
    imgL: {},
    imgR: {}
  }

  AddImgL = () => {
    ImagePicker.openPicker({
      width: 180,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setState({
        imgL: image
      })
    });
  };

  AddImgR = () => {
    ImagePicker.openPicker({
      width: 180,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log(image);

      var blob = this.b64toBlob(image.data, image.mime);
      storage.ref().child("images/image.jpg").putString(image.data, 'base64').then(function (snapshot) {
        console.log('Uploaded a blob or file!');
      });

      console.log(blob);
      this.setState({
        imgR: image
      })


    });
  };

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  handlePoll = () => {
    //this.handleGet(); return;
    this.props.navigation.navigate('Poll');

    var col = firebase.firestore().collection("polls").add({
      // uerid:"user",
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

    // uploadImage(response.uri)
    //   .then(url => this.setState({ img: url }))
    // .catch(error => console.log(error))

  }



  render() {
    return (
      <View style={styles.container}>

        <ImageBackground
          style={{
            width: "100%",
            height: 70,
            position: "absolute",
            top: 0,
          }}
          source={require('../../imgs/Header.png')}
        />



        <Text style={{ marginTop: 50 }}>Create</Text>
        <TextInput
          placeholder="Type Title here..."
          onChangeText={(text) => { this.title = text }}
        />

        <View style={styles.arg_container}>

          <ImageBackground
            style={styles.arg_img}
            source={{ uri: this.state.imgL.path }}
          >
            <TouchableOpacity
              onPress={this.AddImgL}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
              onChangeText={(text) => { this.ldesc = text }}
            />


          </ImageBackground>

          <ImageBackground
            style={styles.arg_img}
            source={{ uri: this.state.imgR.path }}
          >

            <TouchableOpacity
              onPress={this.AddImgR}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
              onChangeText={(text) => { this.rdesc = text }}
            />


          </ImageBackground>
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
    width: 180,
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
