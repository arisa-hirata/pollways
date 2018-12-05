// import firebase from 'firebase';
// import { Actions } from 'react-native-router-flux';

import { getFB } from "../components/firebase";

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGN_UP
} from './types';
//Payload 
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
//Angus Update
export const loginUser = ({ email, password }) => {
  console.log("filtererrorblah", email, password)
  return (dispatch) => {
    //loginUserSuccess(dispatch, {}); return;

    getFB().auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        var ref = getFB().firestore().collection("profile").doc(user.user.uid);
        ref.get().then((snap) => {
          console.log("filtererrorblah", snap.data());
          var obj = snap.data();
          user.user.username = obj.username;
          user.user.age = obj.age;
          user.user.gender = obj.gender;
          user.user.time = obj.time;
          //After logging in
          user.user.pImg = obj.pImg;
          console.log("HelloCCC", user.user.pImg);
          loginUserSuccess(user)(dispatch)
          dispatch({ type: LOGIN_USER });
        })
      })
      .catch((error) => {
        // console.warn("loginUser failed");
        console.warn(error);
        loginUserFail(dispatch)
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(user => loginUserSuccess(dispatch, user))
        //   .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};


export const loginUserSuccess = (user) => {
  // console.warn("success")
  // console.warn(user)
  console.log("HelloBBB", user);
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user,
    });
  }
};

//has to be in order like the one in SignUp.js
//Return(dispatch)??????
//takes what you have inputted in the sign up page and takes it here
//dispatches it to SIGN_UP in the reducers
// go to reducers
export const signUp = ({ email, password, username, gender, age, time }) => {
  console.log("filtererrorblah", email, password);
  return (dispatch) => {


    getFB().auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        var ref = getFB().firestore().collection("profile").doc(user.user._user.uid).set({
          gender: gender,
          age: age,
          time: time,
          username: username,
        })
        user.user.username = username;
        user.user.age = age;
        user.user.gender = gender;
        user.user.time = time;
        loginUserSuccess(user)(dispatch);
        dispatch({ type: SIGN_UP });
      })
      .catch(() => loginUserFail(dispatch));
  }
}
