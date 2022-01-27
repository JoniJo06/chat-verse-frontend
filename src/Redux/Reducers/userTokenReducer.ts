import { UserTokenActionTypes, UserTokenState } from '../Types';
import { Reducer } from 'redux';

export const initialState: UserTokenState = {
  data: {
    userToken: '',
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<UserTokenState> = (
  state: UserTokenState = initialState,
  action
) => {
  switch (action.type) {
    case UserTokenActionTypes.SET_TOKEN:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          userToken: action.payload,
        },
      };
    case UserTokenActionTypes.REMOVE_TOKEN:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          userToken: '',
        },
      };
    default:
      return state;
  }
};
export { reducer as userTokenReducer };
