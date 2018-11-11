import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { getApp, getFB } from "../firebase";
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

class AddPollTab extends React.Component {

  constructor(props) {
    super(props)
    this.title = "";
    this.desc = '';
    this.img = null;
    this.storage = getApp().storage();
    this.firebase = getFB();
    this.state = {
      imgL: {},
      imgR: {}
    }
  }

  AddImg = (stateName) => {
    ImagePicker.openPicker({
      width: 180,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      this.setState({
        [stateName]: image
      })
    });
  };

  handlePoll = async () => {
    // this.handleGet(); return;
    this.props.navigation.navigate('Poll');

    this.firebase.firestore().collection("polls").add({
      // uerid:"user",
      title: this.title,
      desc: this.desc,
      img: null,
      time: new Date(),
      options: {
        left: {
          title: "sushi",
          desc: this.ldesc,
          img: null,
          votes: []
        },
        right: {
          title: "pie",
          desc: this.rdesc,
          img: null,
          votes: []
        }
      }

    }).then((ref) => {
      var uploadTask = this.storage.ref().child("images/" + ref.id + "R.jpg").putString(this.state.imgR.data, 'base64')
      var that = this;

      uploadTask.then((snapshot) => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

          console.log('File available at', downloadURL);
          var uploadTask = this.storage.ref().child("images/" + ref.id + "L.jpg").putString(this.state.imgL.data, 'base64')

          uploadTask.then((snapshot) => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL2) => {

              console.log('File available at', downloadURL2);
              ref.update({
                votesL: [],
                votesR: [],
                title: that.title,
                desc: that.desc,
                img: null,
                time: new Date(),
                options: {
                  left: {
                    title: "sushi",
                    desc: that.ldesc,
                    img: downloadURL2
                  },
                  right: {
                    title: "pie",
                    desc: that.rdesc,
                    img: downloadURL
                  }
                }
              });
            })
          })
        })
      })
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: "100%",
            height: 85,
            position: "absolute",
            top: 0,
          }}
          source={require('../../imgs/Header.png')}
        />
        <Text style={{
          zIndex: 99,
          position: "absolute",
          top: 25,
          fontSize: 45,
          color: "#fff"
        }}>Create</Text>


        <TextInput
          style={{
            fontSize: 30,
            marginBottom: 30
          }}
          placeholder="Type Title Here..."
          onChangeText={(text) => { this.title = text }}
        />

        <View style={styles.arg_container}>

          <ImageBackground
            style={styles.arg_img}
            source={{ uri: this.state.imgL.path }}
          >
            <TouchableOpacity
              onPress={() => this.AddImg("imgL")}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <TextInput
              multiline={true}
              numberOfLines={4}
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
              onPress={() => this.AddImg("imgR")}
            >
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.arg_desc}
              placeholder="Give your argment..."
              onChangeText={(text) => { this.rdesc = text }}
            />


          </ImageBackground>
        </View>


        <View style={styles.profile_container}>

          <Image
            style={{ width: 45, height: 45, marginLeft: 50 }}
            source={require('../../imgs/ProfileDefault.png')}
          />

          <Text style={styles.profile_name}>Profile Name</Text>

        </View>


        <TextInput
          multiline={true}
          numberOfLines={4}
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
    width: "75%",
    height: 80,
    borderRadius: 7,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '30%'
  },
  poll_desc: {
    height: 80,
    width: 200,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10
  },
  btn: {
    backgroundColor: "#F9E7A2",
    width: 130,
    height: 40,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 7,
    margin: 10
  },
  profile_container: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  profile_img: {
    height: 50,
    width: 50,
    marginLeft: 30,
  },
  profile_name: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
  },

});


export default AddPollTab;
