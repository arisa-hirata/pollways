import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
//AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk
//https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk
//$ npm install react-native-progress --save
// import ProgressBarAnimated from 'react-native-progress-bar-animated';
// import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { getFB } from "../firebase";
import { ChangePollID, ChangeIndex } from '../../actions/PollActions';

var firebase = getFB();

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class ProfileTab extends React.Component {

  blob = null;


  state = {
    ShowPlace: "",
    position: {},
    error: "",
    img: {},
    filename: "",
    polls: []
  }
  getPlace = async (lat, long) => {
    console.log("latlng", lat, long);
    var resp = await fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDOzIQCN_wh25kKX-FywqgFcrTay_O2ohk");
    var place = await resp.json();
    console.log(place);
    console.log(place.plus_code.compound_code);
    var city = place.plus_code.compound_code;
    var cityTemp = city.split(" ");
    cityTemp.shift();

    this.setState({
      //join will add whatever you input in the join(" ")
      ShowPlace: cityTemp.join(" ")
    });
    // console.log(cityTemp)
  }

  componentDidMount() {
    this.getPolls()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getPlace(
          position.coords.latitude,
          position.coords.longitude
        )
      },
    );
  }

  AddImg = async () => {
    const image = await ImagePicker.openPicker({
      width: 160,
      height: 160,
      cropping: true,
      compressImageQuality: 0.3,
    })
    var imgF = await RNFetchBlob.fs.readFile(image.path, "base64");
    var blob = await Blob.build(imgF, { type: 'image/jpg;BASE64' });

    this.blob = blob;

    this.setState({
      img: image,
      // filename: image.filename
    });
    console.log("whatthefucj", filename)

    const ref = getFB().storage().ref("profileImg/" + this.props.user.user.uid + `_.jpg`)
    await ref.putFile(image.path)
    const url = await ref.getDownloadURL();

    var ref2 = await getFB().firestore().collection("profile").doc(this.props.user.user.uid).update({
      pImg: url
    })

  };
// Cant I just use this sort of functions and call out my image from Storage and change the state of the Image?????????
  getPolls = async () => {
    // Show only for the user
    console.log("HelloAA", this.props.user.user.uid);
    var polls = await firebase.firestore().collection("polls").where("uerid", "==", this.props.user.user.uid);
    console.log("HelloAA", polls)
    var allPolls = [];
    console.log("HelloAA", "SnapBefore")
    var snap = await polls.get();
    console.log("HelloAA", snap);
    snap.forEach((doc) => {
      console.log("HelloAA", doc.data());
      var obj = doc.data();
      obj.pollid = doc.id
      allPolls.push(obj);
    })
    this.setState({
      polls: allPolls
    })

  }

  seePoll = () => {
    //Go to this polls Insights
    this.props.dispatch(ChangePollID(this.allPolls[this.curIndex].doc_id));//dispatch action to change pollid
    this.props.dispatch(ChangeIndex(this.curIndex));
    this.setState({
      title: this.allPolls[this.curIndex].title,
      rimg: this.allPolls[this.curIndex].options.right.img,
      limg: this.allPolls[this.curIndex].options.left.img,
      username: this.allPolls[this.curIndex].username
    });
  }


  signOutUser = async () => {
    try {
      await getFB().auth().signOut();
      this.props.navigation.navigate('Login')
    } catch (error) {
      alert(error);
    }
  }


  render() {

    var pollImages = this.state.polls.map((obj, index) => {
      return (
        <TouchableOpacity>
          <View style={styles.boxContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.textContainer}>{obj.title}</Text>
            </View>
            <ImageBackground
              source={require('../../imgs/1x/Asset14.png')}
              style={[styles.imgouterContainer, {}]}
            >
              <View style={[styles.imgContainer, {
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10
              }]}>
                <Image
                  style={{ width: 440, height: 440, resizeMode: "contain", }}
                  source={{ uri: obj.options.right.img }}>
                </Image>
              </View>

              <View style={[styles.imgContainer, {
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10
              },]}>
                <Image
                  style={{ width: 440, height: 440, resizeMode: "contain", }}
                  source={{ uri: obj.options.left.img }}>
                </Image>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      )
    })

    console.log(this.props.navigation);

    console.log("profilestuff", this.props);
    const barWidth = Dimensions.get('screen').width - 80;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <View style={styles.topBarItem}>
              <View style={styles.topBarItemInner}>
                <View style={{ paddingLeft: 25, marginTop: 20 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Tutorials')}>
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require('../../imgs/Archive.png')}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.topBarItem}>
              <View style={styles.topBarItemInner}>
                <TouchableOpacity onPress={() => this.signOutUser()}>
                  {/* this.props.navigation.navigate('Login')}> */}
                  <Text style={{
                    textAlign: 'right',
                    paddingRight: 25, marginTop: 20
                  }}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Profile Image*************************************************************************************** */}
          {/* If user P image exists ? then use Uri to move the link OTHERWISE use default LINE 224 */}
          {/* this.props.user.user.pImg is coming from the Reducer you created in AuthActions */}
          <View style={styles.topProfileImg}>
            <View style={styles.ProfileImage}>
              <TouchableOpacity
                onPress={() => this.AddImg()}
              >
                <Image
                  style={{ width: 160, height: 160, borderRadius: 80 }}
                  source={(this.props.user.user.pImg) ? { uri: this.props.user.user.pImg } : require('../../imgs/ProfileDefault.png')}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* username Input**************************************************************************************** */}
          <View style={styles.nameInput}>
            <Text style={{ fontSize: 25 }}>{this.props.user.user.username}</Text>
          </View>
          {/* Location Input**************************************************************************************** */}
          <View style={styles.nameInput}>
            <Text style={{ fontSize: 25 }}>{this.state.ShowPlace}</Text>
          </View>

          <View style={styles.pollBar}>
            <View style={styles.pollBarItem}>
              <View style={styles.pollBarItemInner}>
                <Text style={{}}>My Polls</Text>
              </View>
            </View>

            <View style={styles.pollBarItem}>
              <View style={[styles.pollBarItemInner, { alignItems: 'flex-end' }]}>
                <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity>
                    <Image
                      style={{ width: 10, height: 10 }}
                      source={require('../../imgs/add1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* **************************************************************************************** */}
          <View style={styles.containerboxPoll}>
            {pollImages}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
  // ARCHIVE AND EDIT SECTION********************************************************************
  topBar: {
    height: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  topBarItem: {
    width: '50%',
  },
  topBarItemInner: {
    flex: 1,
  },
  // ********************************************************************
  topProfileImg: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  ProfileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userFriend: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ********************************************************************
  pollBar: {
    width: '80%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 30
  },
  pollBarItem: {
    width: '50%',
  },
  pollBarItemInner: {
    flex: 1,
  },
  // ********************************************************************
  boxContainer: {
    width: 120,
    height: 160,
    margin: 5,
    marginBottom: 50,
  },
  titleContainer: {
    backgroundColor: "#F1E29E",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    padding: 5,
    margin: 5,
  },
  imgouterContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    alignItems: 'center',
    width: "40%",
    height: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "hidden",
  },
  containerboxPoll: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingLeft: 10

  }
});


const mapStateToProps = ({ auth }) => {

  return { ...auth };
};

export default connect(mapStateToProps)(ProfileTab);