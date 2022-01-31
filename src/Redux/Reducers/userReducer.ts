import { UserActionTypes, UserState } from '../Types';
import { Reducer } from 'redux';

export const initialState: UserState = {
  data: {
    status: '',
    user_id: '',
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<UserState> = (
  state: UserState = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          status: action.payload.status,
          user_id: action.payload.user_id
        },
      };
    case UserActionTypes.REMOVE_USER:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          status: '',
          user_id: ''
        },
      };
    default:
      return state;
  }
};
export { reducer as userReducer };