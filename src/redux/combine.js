//combine all the reducers
import { combineReducers } from 'redux';
import {  status } from "./reducers";


const myApp = combineReducers({
    status
});

export default myApp;