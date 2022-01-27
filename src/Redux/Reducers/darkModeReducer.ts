import { DarkModeActionTypes, DarkModeState } from '../Types';
import { Reducer } from 'redux';

export const initialState: DarkModeState = {
  data: {
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<DarkModeState> = (
  state: DarkModeState = initialState,
  action) => {
  switch (action.type) {
    case DarkModeActionTypes.TOGGLE_DARK_MODE:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          darkMode: !state.data.darkMode,
        },
      };
    default:
      return state;
  }

};
export { reducer as darkModeReducer};
