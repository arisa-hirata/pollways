import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';


export default class AddPollTab extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Create</Text>
        <TextInput
          placeholder="Type Title here..."

        />

        <View style={styles.arg_container}>

          <View style={styles.arg_img}>
            <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
            />


          </View>

          <View style={styles.arg_img}>

            <TouchableOpacity>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.arg_desc}
              placeholder="Give your argment..."
            />


          </View>
        </View>

        <TouchableOpacity style={styles.btn}>
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
    width: "45%",
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
