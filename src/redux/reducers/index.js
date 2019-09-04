// import reducer from './reducer';
import {combineReducers} from 'redux';
import userReducer from './user-reducer';
import dashboardReducer from './dashboard_reducer'

export default combineReducers({
    user_reducer : userReducer, 
    dashboard_reducer : dashboardReducer
});