export const TOGGLE_SWITCH='TOGGLE_SWITCH'
export const EDIT_CLASSIFICATION_DATA='EDIT_CLASSIFICATION_DATA'
export const EDIT_CLASSIFICATION_STATE="EDIT_CLASSIFICATION_STATE"
export const INSTITUTES_LIST = "INSTITUTES_LIST"
export const UPLOADED_FILE_DATA="UPLOADED_FILE_DATA"
export const UPLOADED_FILE_FORMAT= "UPLOADED_FILE_FORMAT"
export const UPLOADED_IMAGE = "UPLOADED_IMAGE"
export const CLASSIFICATION_INSTITUTE_NAME = "CLASSIFICATION_INSTITUTE_NAME"
export const CLASSIFICATION_CATEGORY = "CLASSIFICATION_CATEGORY"
export const CLASSIFICATION_NAME = "CLASSIFICATION_NAME"
export const CLASSIFICATION_DURATION = "CLASSIFICATION_DURATION"
export const CLASSIFICATION_DURATION_VALIDITY = "CLASSIFICATION_DURATION_VALIDITY"
export const CLASSIFICATION_FIELDS = "CLASSIFICATION_FIELDS"


export function TOGGLE(toggle_switch) {
    console.log(toggle_switch)
  return { type: TOGGLE_SWITCH, payload : toggle_switch }    
}

export function EditClassification(data) {
  console.log(data)
return { type: EDIT_CLASSIFICATION_DATA, payload : data }    
}

export function EditClassificationState(data) {
  console.log(data)
return { type: EDIT_CLASSIFICATION_STATE, payload : data }    
}

export function InstituteList(institutes){
  console.log(institutes)
  return { type: INSTITUTES_LIST,payload:institutes}
}

export function VerifyFileData(dt){
  console.log(dt)
  return { type: UPLOADED_FILE_DATA,payload:dt}
}
export function FileFormatCheck(dt){
  console.log(dt)
  return { type: UPLOADED_FILE_FORMAT,payload:dt}
}

export function Image(imageFile){
  console.log(imageFile)
  return { type: UPLOADED_IMAGE , payload: imageFile}
}

export function ClassificationInstituteName(instituteName){
  console.log(instituteName)
  return { type: CLASSIFICATION_INSTITUTE_NAME , payload: instituteName}
}

export function ClassificationCategory(classificationCategory){
  console.log(classificationCategory)
  return { type: CLASSIFICATION_CATEGORY , payload: classificationCategory}
}

export function ClassificationName(classificationName){
  console.log(classificationName)
  return { type: CLASSIFICATION_NAME , payload: classificationName}
}

export function ClassificationDuration(duration){
  console.log(duration)
  return { type: CLASSIFICATION_DURATION , payload: duration}
}

export function ClassificationDurationValidity(durationValidity){
  console.log(durationValidity)
  return { type: CLASSIFICATION_DURATION_VALIDITY , payload: durationValidity}
}

export function ClassificationFields(fields){
  console.log(fields)
  return { type: CLASSIFICATION_FIELDS , payload: fields}
}