import { UserTokenActionTypes, UserToken } from '../Types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';

// export type AppThunk = ThunkAction<void,
//   ApplicationState,
//   null,
//   Action<string>>;

export const setUserToken: ActionCreator<ThunkAction<void,
  ApplicationState,
  UserToken,
  Action<string>>> = (token: string) => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserTokenActionTypes.SET_TOKEN,
        payload: token,
      });

    } catch (err) {
      return dispatch({
        type: UserTokenActionTypes.SET_TOKEN_FAILURE,
        payload: null,
      });
    }
  };
};

export const removeUserToken: ActionCreator<ThunkAction<void,
  ApplicationState,
  UserToken,
  Action<string>>> = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserTokenActionTypes.SET_TOKEN,
        payload: null,
      });

    } catch (err) {
      return dispatch({
        type: UserTokenActionTypes.REMOVE_TOKEN_FAILURE,
        payload: null,
      });
    }
  };
};
