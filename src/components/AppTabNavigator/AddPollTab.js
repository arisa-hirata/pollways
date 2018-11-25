import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image, KeyboardAvoidingView,
  keyboardVerticalOffset, ScrollView, Dimensions
} from 'react-native';
import Spinner from '../LogIn/Spinner';
import ImagePicker from 'react-native-image-crop-picker';
import { getFB } from "../firebase";
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { ChangeIndex } from '../../actions/PollActions';

class AddPollTab extends React.Component {

  constructor(props) {
    super(props)
    this.userid = "",
      this.username = "",
      this.title = "";
    this.desc = '';
    this.rDesc = ""
    this.lDesc = ""
    this.img = null;
    this.pollsRef = getFB().firestore().collection("polls")
    this.state = {
      imgL: {},
      imgR: {},
      loading: false
    }
  }


  AddImg = async (stateName) => {
    // console.log(stateName)
    const image = await ImagePicker.openPicker({
      width: 30,
      height: 60,
      cropping: true,
      compressImageQuality: 0.1,
      mediaType: "photo",
      includeBase64: true,
    })

    var imgF = await RNFetchBlob.fs.readFile(image.path, "base64");
    var blob = await Blob.build(imgF, { type: 'image/jpg;BASE64' });

    this.blob = blob;

    this.setState({
      [stateName]: image
    })
  };

  createPoll = async () => {
    console.log(this.props.user.user.uid);
    const response = await this.pollsRef.add({
      uerid: this.props.user.user.uid,
      username: this.props.user.user.username,
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

    this.props.dispatch(ChangeIndex(0));

  }

  handlePoll = async () => {

    this.setState({
      loading: true
    })
    const refId = await this.createPoll()
    const urlLeft = await this.uploadImage(refId, "L")
    const urlRight = await this.uploadImage(refId, "R")
    await this.updatePoll(refId, urlLeft, urlRight);
    this.setState({
      loading: false
    })//setState back to false
    this.props.navigation.navigate('Poll');
  }


  render() {
    return (

      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>

        {(this.state.loading) ?
          <View
            style={{
              alignItems: 'center',
              justifyContent: "center",
              position: "absolute",
              width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "white", left: 0, top: 0, zIndex: 99999
            }}>
            <Spinner />
            <Text style={{ color: "gray", marginTop: "50" }}>LOADING...</Text>
          </View>
          : null}


        <ScrollView style={{ backgroundColor: '#ffffff' }}>
          <View>

            <View style={styles.container}>
              <TextInput
                style={{
                  fontSize: 30,
                  height: 80,
                  width: "70%"
                  // marginBottom: 30
                }}
                placeholder="   Type Title Here..."
                onChangeText={(text) => { this.title = text }}
              />
            </View>
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
                  // multiline={true}
                  // numberOfLines={4}
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
                  defaultValue=''
                  // multiline={true}
                  // numberOfLines={4}
                  style={styles.arg_desc}
                  placeholder="Give your argment..."
                  onChangeText={(text) => { this.rDesc = text }}
                />


              </ImageBackground>
            </View>


            <View style={styles.container}>
              <View style={styles.profile_container}>

                <Image
                  style={{ width: 45, height: 45, marginLeft: 50 }}
                  source={require('../../imgs/ProfileDefault.png')}
                />

                <Text style={styles.profile_name}>{this.props.user.user.username}</Text>

              </View>


              <TextInput
                defaultValue=''
                // multiline={true}
                // numberOfLines={4}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arg_container: {
    flexDirection: "row",
  },
  arg_img: {
    backgroundColor: "lightgray",
    width: 170,
    height: 280,
    margin: "2%",
  },
  plus: {
    color: '#fff',
    fontSize: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 100,
  },
  arg_desc: {
    backgroundColor: "#fff",
    width: "75%",
    height: 80,
    borderRadius: 7,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 20
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
    marginTop: "5%",
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

});


const mapStateToProps = ({ auth }) => {

  return { ...auth };
};

export default connect(mapStateToProps)(AddPollTab);
