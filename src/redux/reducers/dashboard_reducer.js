import { TOGGLE_SWITCH } from "../actions/dashboard-action";

const INITIAL_STATE = {
    toggle_switch_state : false
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_SWITCH:
        return({ 
            ...state,
            toggle_switch_state : action.payload
        })
        default: 
        return state
    }
}