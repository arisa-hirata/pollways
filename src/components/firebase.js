// import firebase from 'firebase';
// import "firebase/firestore";

// var app = firebase.initializeApp({
//   apiKey: "AIzaSyAxWDd4UeYmX9X9bgCPkIgKa7T_opCv9vA",
//   authDomain: "pollways-85c25.firebaseapp.com",
//   databaseURL: "https://pollways-85c25.firebaseio.com",
//   projectId: "pollways-85c25",
//   storageBucket: "pollways-85c25.appspot.com",
//   messagingSenderId: "157764717750"
// });

import firebase from 'react-native-firebase';

// var muser = null

firebase.firestore().settings({ timestampsInSnapshots: true });

// firebase.auth().onAuthStateChanged(async user => {
//   if (!user) {
//     await firebase.auth().signInAnonymously();
//     //add to users collection
//     console.log(user);
//     muser = user;
//   } else {
//     console.log(user);
//     muser = user;
//   }

// });

// export function getApp() {
//   return app;
// }

export function getFB() {
  return firebase;
}
// export function getUser() {
//   return muser;
// }
