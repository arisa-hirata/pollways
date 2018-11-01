import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';



class EditProfile extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <Text>Edit Profile</Text>

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
    // SaveProfile:state.Profile.SaveProfile
    // EditProfile: state.ChangeProfile.EditProfile
  }
}
export default connect(mapStateToProps)(EditProfile);
