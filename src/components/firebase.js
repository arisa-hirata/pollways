import firebase from 'firebase';
import "firebase/firestore";

var app = firebase.initializeApp({
  apiKey: "AIzaSyAxWDd4UeYmX9X9bgCPkIgKa7T_opCv9vA",
  authDomain: "pollways-85c25.firebaseapp.com",
  databaseURL: "https://pollways-85c25.firebaseio.com",
  projectId: "pollways-85c25",
  storageBucket: "pollways-85c25.appspot.com",
  messagingSenderId: "157764717750"
});

firebase.firestore().settings({ timestampsInSnapshots: true });

firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    await firebase.auth().signInAnonymously();
    //add to users collection
  }
});

export function getApp() {
  return app;
}

export function getFB() {
  return firebase;
}
