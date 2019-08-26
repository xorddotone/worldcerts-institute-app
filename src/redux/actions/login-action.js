export const SINGLE_USER_DATA='SINGLE_USER_DATA'

export function USER_DATA(data) {
    console.log(data)
  return { type: SINGLE_USER_DATA, payload : data }    
}
