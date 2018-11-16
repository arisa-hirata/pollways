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

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    //loginUserSuccess(dispatch, {}); return;
    dispatch({ type: LOGIN_USER });

    getFB().auth().signInWithEmailAndPassword(email, password)
      .then(user => {

        //get profile from firebase with doc(user.uid)

        //put profile username, gender, age to reducer
        loginUserSuccess(user)(dispatch)
      })
      .catch((error) => {
        // console.warn("loginUser failed");
        // console.warn(error);
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
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user,
    });
  }
};


export const signUp = ({ email, password, username, gender, age }) => {
  return (dispatch) => {
    dispatch({ type: SIGN_UP });

    getFB().auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user.user._user.uid);
        getFB().firestore().collection("profile").doc(user.user._user.uid).set({
          username: username,
          gender: gender,
          age: age
        })
        loginUserSuccess(user)(dispatch);
      })
      .catch(() => loginUserFail(dispatch));
  }
}
