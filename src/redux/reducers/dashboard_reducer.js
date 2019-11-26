import {
    TOGGLE_SWITCH,
    EDIT_CLASSIFICATION_DATA,
    EDIT_CLASSIFICATION_STATE,
    UPLOADED_FILE_DATA,
    UPLOADED_FILE_FORMAT,
    UPLOADED_IMAGE,
    CLASSIFICATION_INSTITUTE_NAME,
    CLASSIFICATION_CATEGORY,
    CLASSIFICATION_NAME,
    CLASSIFICATION_DURATION_TIME,
    CLASSIFICATION_DURATION_SPAN,
    CLASSIFICATION_FIELDS,
    CLASSIFICATION_COMBINE_FIELDS,
    CLASSIFICATION_QR,
    CLASSIFICATION_TOTAL_FIELDS,
    CERTIFICATE_TEXT_FIELDS_PERCENTAGE,
    CERTIFICATE_TEXT_FIELDS_PX,
    CLASSIFICATION_FIELDS_PREVIEW,
    CERTIFICATE_ALL_FIELDS,
    CERTIFICATE_FIELDS_FLAG,

    
} from "../actions/dashboard-action";

const INITIAL_STATE = {
    uploadedFileData: {},
    FileFormatFlag: false,
    toggle_switch_state: false,
    editClassificationData: {
        category: '',
        classification: '',
        durationValidity: null,
        instituteName: '',
        _id: '',
    },
    editClassificationState: false,
    image: {
        name:""
    },
    //  Classification attributes
    registerClassificationInstituteName: "",
    registerClassificationName: "",
    registerClassificationCategory: "",
    registerClassificationDurationTime: "",
    registerClassificationDurationSpan: "",
    classificationFields: [],
    classificationCombineFields: [],
    classificationTotalFields: [],
    qrVisibility: true,
    certificateTextFieldsPercentage: [],
    certificateTextFieldsPX: [],
    certificatePreviewFields : [],
    certificateAllFields:[],
    certificateFieldsFlag:{
        isEmpty:false,
        duplicate:false
    }

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return ({
                ...state,
                toggle_switch_state: action.payload
            })
        case EDIT_CLASSIFICATION_DATA:
            return ({
                ...state,
                editClassificationData: action.payload
            })
        case EDIT_CLASSIFICATION_STATE:
            return ({
                ...state,
                editClassificationState: action.payload
            })
        case UPLOADED_FILE_DATA:
            return ({
                ...state,
                uploadedFileData: action.payload
            })
        case UPLOADED_FILE_FORMAT:
            return ({
                ...state,
                FileFormatFlag: action.payload
            })
        case UPLOADED_IMAGE:
            return ({
                ...state,
                image: action.payload
            })
        case CLASSIFICATION_INSTITUTE_NAME:
            return ({
                ...state,
                registerClassificationInstituteName: action.payload
            })
        case CLASSIFICATION_CATEGORY:
            return ({
                ...state,
                registerClassificationCategory: action.payload
            })
        case CLASSIFICATION_NAME:
            return ({
                ...state,
                registerClassificationName: action.payload
            })
        case CLASSIFICATION_DURATION_TIME:
            return ({
                ...state,
                registerClassificationDurationTime: action.payload
            })
            case CLASSIFICATION_DURATION_SPAN:
            return ({
                ...state,
                registerClassificationDurationSpan: action.payload
            })
            case CLASSIFICATION_FIELDS:
            return ({
                ...state,
                classificationFields: action.payload
            })
            case CLASSIFICATION_COMBINE_FIELDS:
            return ({
                ...state,
                classificationCombineFields: action.payload
            })
            case CLASSIFICATION_TOTAL_FIELDS:
            return ({
                ...state,
                classificationTotalFields: action.payload
            })
            case CLASSIFICATION_QR:
            return ({
                ...state,
                qrVisibility: action.payload
            })
            case CERTIFICATE_TEXT_FIELDS_PERCENTAGE:
            return ({
                ...state,
                certificateTextFieldsPercentage: action.payload
            })
            case CERTIFICATE_TEXT_FIELDS_PX:
            return ({
                ...state,
                certificateTextFieldsPX: action.payload
            })
            case CLASSIFICATION_FIELDS_PREVIEW:
                return ({
                    ...state,
                    certificatePreviewFields: action.payload
                })
            case CERTIFICATE_ALL_FIELDS:
                return ({
                        ...state,
                        certificateAllFields: action.payload
                    })
            case CERTIFICATE_FIELDS_FLAG:
                return ({
                ...state,
                certificateFieldsFlag: action.payload
                })
        default:
            return state
    }
}