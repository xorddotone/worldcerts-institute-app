export const TOGGLE_SWITCH='TOGGLE_SWITCH'
export const EDIT_CLASSIFICATION_DATA='EDIT_CLASSIFICATION_DATA'
export const EDIT_CLASSIFICATION_STATE="EDIT_CLASSIFICATION_STATE"
export const INSTITUTES_LIST = "INSTITUTES_LIST"


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
