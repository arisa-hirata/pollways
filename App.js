import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Navigator from './src/components/Navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
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

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAxWDd4UeYmX9X9bgCPkIgKa7T_opCv9vA",
      authDomain: "pollways-85c25.firebaseapp.com",
      databaseURL: "https://pollways-85c25.firebaseio.com",
      projectId: "pollways-85c25",
      storageBucket: "pollways-85c25.appspot.com",
      messagingSenderId: "157764717750"
    });

  }


  render() {

    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }

}

export default App;
