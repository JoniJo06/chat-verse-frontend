import { DarkModeType } from '../Types'

const reducer = (state: boolean, action: DarkModeType) => {
  state = localStorage.getItem('darkMode') === 'true' || false
  if (action.type === 'toggle') {
    localStorage.setItem('darkMode', String(!state))
    return !state
  } else return state
}
export default reducer
