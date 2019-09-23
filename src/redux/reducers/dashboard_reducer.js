import { TOGGLE_SWITCH,EDIT_CLASSIFICATION_DATA,EDIT_CLASSIFICATION_STATE,UPLOADED_FILE_DATA,UPLOADED_FILE_FORMAT } from "../actions/dashboard-action";

const INITIAL_STATE = {
    uploadedFileData:{},
    FileFormatFlag:false,
    toggle_switch_state : false,
    editClassificationData:{
        category:'',
        classification:'',
        durationValidity:null,
        instituteName:'',
        _id:''
    },
    editClassificationState:false
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
        case EDIT_CLASSIFICATION_STATE:
        return({ 
            ...state,
            editClassificationState : action.payload
        })
        case UPLOADED_FILE_DATA:
        return({ 
            ...state,
            uploadedFileData : action.payload
        })
        case UPLOADED_FILE_FORMAT:
        return({ 
            ...state,
            FileFormatFlag : action.payload
        })
        default: 
        return state
    }
}