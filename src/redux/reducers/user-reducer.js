import { SINGLE_USER_DATA } from "../actions/login-action";

const INITIAL_STATE = {
    email : '',
    is_login : false,
    token : '',
    user:{}
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SINGLE_USER_DATA:
        return({ 
            ...state,
            user : action.payload
        })
        default: 
        return state
    }
}