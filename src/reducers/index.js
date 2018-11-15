import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PollReducer from './PollReducer';

export default combineReducers({
  auth: AuthReducer,
  vote: PollReducer
});
