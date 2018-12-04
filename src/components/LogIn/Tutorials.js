import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper-animated';


const { width, height } = Dimensions.get('screen');
// november 16 2018 edited from Angus
class Tutorials extends Component {

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
            <ImageBackground
              style={{ width: width, height: height }}
              source={require('../../imgs/1x/1x/Tut1.jpg')}
            />
          </View>

          <View style={styles.slide2}>
            <ImageBackground
              style={{ width: width, height: height }}
              source={require('../../imgs/1x/1x/Tut2.jpg')}
            />
          </View>

          <View style={styles.slide3}>
            <ImageBackground
              style={{ resizeMode: 'stretch', width: width, height: height }}
              source={require('../../imgs/1x/1x/Tut3.jpg')}
            />
          </View>

          <View style={styles.slide4}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
              <ImageBackground
                style={{ width: width, height: height }}
                source={require('../../imgs/1x/1x/Tut4.jpg')}
              >
                <Image
                  style={styles.buttonImage}
                  source={require('../../imgs/1x/Start.png')}
                />
              </ImageBackground>
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
  buttonImage: {
    position: 'absolute',
    bottom: 130,
    width: 100,
    height: 100,
    resizeMode: "contain",
    left: "35%",
    zIndex: 10000
  }
};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Tutorials);
