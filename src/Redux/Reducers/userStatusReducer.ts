import { UserStatusActionTypes, UserStatusState } from '../Types';
import { Reducer } from 'redux';

export const initialState: UserStatusState = {
  data: {
    userStatus: '',
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<UserStatusState> = (
  state: UserStatusState = initialState,
  action
) => {
  switch (action.type) {
    case UserStatusActionTypes.SET_STATUS:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          userStatus: action.payload,
        },
      };
    case UserStatusActionTypes.REMOVE_STATUS:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          userStatus: '',
        },
      };
    default:
      return state;
  }
};
export { reducer as userStatusReducer };