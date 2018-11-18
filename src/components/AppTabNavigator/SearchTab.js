import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { vote } from '../../actions';
import { getFB } from "../firebase";


class SearchTab extends React.Component {

  componentWillMount() {
    var docRef = getFB().firestore().collection('polls');
    docRef.get().then((doc) => {
      console.log(doc);
      console.log(docRef);
    })
  }

  handleSearch = () => {

  }


  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: "lightgray",
              borderWidth: 1,
              borderRadius: 7,
            }}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.btn}>
            <Text
              onChangeText={this.handleSearch}
              style={styles.btnText}

            >Search</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
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

const mapStateToProps = ({ vote }) => {
  return { ...vote };
};

export default connect(mapStateToProps, { vote })(SearchTab);
