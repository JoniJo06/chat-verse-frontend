import { UserStatusActionTypes, UserStatus } from '../Types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';

// export type AppThunk = ThunkAction<void,
//   ApplicationState,
//   null,
//   Action<string>>;

export const setUserStatus: ActionCreator<ThunkAction<void,
  ApplicationState,
  UserStatus,
  Action<string>>> = (status: string) => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserStatusActionTypes.SET_STATUS,
        payload: status,
      });

    } catch (err) {
      return dispatch({
        type: UserStatusActionTypes.SET_STATUS_FAILURE,
        payload: null,
      });
    }
  };
};

export const removeUserStatus: ActionCreator<ThunkAction<void,
  ApplicationState,
  UserStatus,
  Action<string>>> = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserStatusActionTypes.SET_STATUS,
        payload: null,
      });

    } catch (err) {
      return dispatch({
        type: UserStatusActionTypes.REMOVE_STATUS_FAILURE,
        payload: null,
      });
    }
  };
};
