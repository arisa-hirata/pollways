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

          <View style={{ flexDirection: 'row', marginTop: 50 }}>
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
          <View style={styles.border} />
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
    width: 80,
    height: 40,
    borderRadius: 7,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    padding: 7,
    marginTop: 5,
  },
  border: {
    borderBottomColor: '#9A9A9A',
    borderBottomWidth: 1,
    width: "80%",
    margin: 20,
  }
});

const mapStateToProps = ({ vote }) => {
  return { ...vote };
};

export default connect(mapStateToProps, { vote })(SearchTab);
