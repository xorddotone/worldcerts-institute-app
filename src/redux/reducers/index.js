// import reducer from './reducer';
import {combineReducers} from 'redux';
import userReducer from './user-reducer';

export default combineReducers({
    user_reducer : userReducer, 
});