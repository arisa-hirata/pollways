import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGN_UP
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };

    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };

    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case LOGIN_USER_SUCCESS:
      console.log(LOGIN_USER_SUCCESS);
      // console.warn(action)
      console.log("HelloBBBB",action.payload);
      // console.log("Hello22", user);
      // action.payload = Object.assign({}, action.payload);
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loading: false

      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Can not find your account. Please check your email and password.',
        password: '',
        loading: false
      };

    case SIGN_UP:
    //ok I dont know what ...State means but I am guessing
    //INITIAL_STATE is where the emails i Inputted in Signup are being set to
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loading: false
      };


    default:
      return state;
  }
};
