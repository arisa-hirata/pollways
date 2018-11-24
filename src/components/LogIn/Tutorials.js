import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper-animated';


const { width, height } = Dimensions.get('screen');
// november 16 2018 edited from Angus
class Tutorials extends Component {
  static navigationOptions = {
    header: null,
    headerBackground: null
  };

  render() {
    return (
        <ImageBackground
        style={styles.imgBackground}
        source={require('../../imgs/LogInBG.jpg')}>
        <Swiper
        style={styles.wrapper}
        smoothTransition={true}
        // swipeDirection
        loop
      >
        <View style={styles.slide1}>
          <Image
            style={{resizeMode:'stretch', width:"100%", height: "100%"}}
            source={require('../../imgs/1x/Tut1.jpg')}
          />
        </View>

        <View style={styles.slide2}>
        <Image
            style={{resizeMode:'stretch', width:"100%", height: "100%"}}
            source={require('../../imgs/1x/Tut2.jpg')}
          />       
        </View>

        <View style={styles.slide3}>
        <Image
          style={{resizeMode:'stretch', width:"100%", height: "100%"}}
          source={require('../../imgs/1x/Tut3.jpg')}
          />        
          </View>

        <View style={styles.slide4}>
        <Image
          style={{resizeMode:'stretch', width:"100%", height: "100%"}}
          source={require('../../imgs/1x/Tut4.jpg')}
          />
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Image
            style={styles.buttonImage}
            source={require('../../imgs/1x/Start.png')}
          />
          </TouchableOpacity>
          </View>
      </Swiper>
      </ImageBackground>
    );
  }
}

const styles = {
    wrapper: {
    //   backgroundColor: '#009688',
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#e91e63',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#673ab7',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: '#3f51b5',
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      //   backgroundColor: '#3f51b5',
      },
    imgBackground: {
        width: width,
        height: height,
      },
      buttonImage:{
        position: 'relative',
        bottom: 130,
        width: 100,
        height: 100,
        resizeMode: "contain",
        zIndex: 10000
      }
  };

const mapStateToProps = ({ auth }) => {
  // const { email, password, error, loading, user } = auth;

  return { ...auth };
};

export default connect(mapStateToProps, {
})(Tutorials);
