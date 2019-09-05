export const TOGGLE_SWITCH='TOGGLE_SWITCH'

export function TOGGLE(toggle_switch) {
    console.log(toggle_switch)
  return { type: TOGGLE_SWITCH, payload : toggle_switch }    
}
