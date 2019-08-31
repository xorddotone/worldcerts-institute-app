export const SINGLE_USER_DATA='SINGLE_USER_DATA'
export const LOGGED_IN="LOGGED_IN"
export const SELECTED_INSTITUTE_NAME="SELECTED_INSTITUTE_NAME"

export function USER_DATA(data) {
    // console.log(data)
  return { type: SINGLE_USER_DATA, payload : data }    
}
export function LOGIN_STATUS(data) {
  console.log(data)
return { type: LOGGED_IN, payload : data }    
}
export function SELECTED_INSTITUTE(name) {
  console.log(name)
return { type: SELECTED_INSTITUTE_NAME, payload : name }    
}
