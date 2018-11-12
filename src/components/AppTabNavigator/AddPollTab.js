import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { getFB } from "../firebase";
import ImagePicker from 'react-native-image-crop-picker';

class AddPollTab extends React.Component {

  constructor(props) {
    super(props)
    this.title = "";
    this.desc = '';
    this.rDesc = ""
    this.lDesc = ""
    this.img = null;
    this.pollsRef = getFB().firestore().collection("polls")
    this.state = {
      imgL: {},
      imgR: {}
    }
  }

  AddImg = async (stateName) => {
    // console.log(stateName)
    const image = await ImagePicker.openPicker({
      width: 30,
      height: 30,
      cropping: true,
      mediaType: "photo",
      includeBase64: true
    })

    this.setState({
      [stateName]: image
    })
  };

  createPoll = async () => {
    const response = await this.pollsRef.add({
      // uerid:"user",
      title: this.title,
      desc: this.desc,
      time: new Date(),
      options: {
        left: {
          desc: this.lDesc,
        },
        right: {
          desc: this.rDesc,
        }
      }
    })
    return response.id
  }

  uploadImage = async (refId, direction) => {
    if (!this.state[`img${direction}`] === {}) return undefined
    const ref = getFB().storage().ref("images/" + refId + `_${direction}.jpg`)
    await ref.putFile(this.state[`img${direction}`].path)
    const url = await ref.getDownloadURL();
    return url
  }

  updatePoll = async (refId, urlLeft, urlRight) => {
    await this.pollsRef.doc(refId).update("options", {
      left: {
        desc: this.lDesc,
        img: urlLeft
      },
      right: {
        desc: this.rDesc,
        img: urlRight
      }
    });
  }

  handlePoll = async () => {
    this.props.navigation.navigate('Poll');
    const refId = await this.createPoll()
    const urlLeft = await this.uploadImage(refId, "L")
    const urlRight = await this.uploadImage(refId, "R")
    await this.updatePoll(refId, urlLeft, urlRight);
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
              onChangeText={(text) => { this.lDesc = text }}
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
              onChangeText={(text) => { this.rDesc = text }}
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
