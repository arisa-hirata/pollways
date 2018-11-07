import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Navigator from './src/components/Navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import "firebase/firestore";
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
// import Router from './Router';


const store = createStore(
  reducers,
  applyMiddleware(
    ReduxThunk
  )
);


class App extends React.Component {

  static navigationOptions = {
    header: null,
    headerBackground: null
  };

  voteLeft = ({ Lpoll }) => {
    const createdAt = Date.now();
    this.LpollCollection.add({
      Lpoll, createdAt
    });
  };

  voteRight = ({ Rpoll }) => {
    const createdAt = Date.now();
    this.RpollCollection.add({
      Rpoll, createdAt
    });
  };

  get pollsCollection() {
    return firebase.firestore().collection("polls");
  }

  get LpollCollection() {
    return this.pollsCollection.doc(this.uid).collection("Lpoll");
  }

  get RpollCollection() {
    return this.pollsCollection.doc(this.uid).collection("Rpoll");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }



  render() {

    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }

}

App.shared = new App();
export default App;
