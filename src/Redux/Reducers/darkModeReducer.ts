import { DarkModeAction as Action } from '../Types';

const reducer = (state: boolean, action: Action) => {
  state = localStorage.getItem('darkMode') === 'true' || false;
  switch (action.type) {
    case 'toggle':
      localStorage.setItem('darkMode', String(!state));
      return !state;
    default:
      return state;
  }
};
export default reducer;
