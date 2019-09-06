import { TOGGLE_SWITCH,EDIT_CLASSIFICATION_DATA } from "../actions/dashboard-action";

const INITIAL_STATE = {
    toggle_switch_state : false,
    editClassificationData:{}
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_SWITCH:
        return({ 
            ...state,
            toggle_switch_state : action.payload
        })
        case EDIT_CLASSIFICATION_DATA:
        return({ 
            ...state,
            editClassificationData : action.payload
        })
        default: 
        return state
    }
}