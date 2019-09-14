import { SINGLE_USER_DATA, LOGGED_IN, SELECTED_INSTITUTE_NAME} from "../actions/login-action";
import {INSTITUTES_LIST } from "../actions/dashboard-action"

const INITIAL_STATE = {
    email: '',
    is_login: false,
    token: '',
    user: {},
    selectedInstituteName: {
        name: 'Select Organization',
        id: '',
        url: '',
        email: '',
        certificateStore: ''
    },
    institutesList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SINGLE_USER_DATA:
            return ({
                ...state,
                user: action.payload
            })
        case LOGGED_IN:
            return ({
                ...state,
                is_login: action.payload
            })
        case SELECTED_INSTITUTE_NAME:
            return ({
                ...state,
                selectedInstituteName: action.payload
            })
        case INSTITUTES_LIST: 
            return ({
                ...state,
                institutesList: action.payload
            })
        default:
            return state
    }
}