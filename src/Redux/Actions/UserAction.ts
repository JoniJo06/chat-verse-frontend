import { UserActionTypes, User } from '../Types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';

// export type AppThunk = ThunkAction<void,
//   ApplicationState,
//   null,
//   Action<string>>;

export const setUser: ActionCreator<ThunkAction<void,
  ApplicationState,
  User,
  Action<string>>> = (status: string, user_id:string) => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserActionTypes.SET_USER,
        payload: {
          status: status,
          user_id: user_id
        },
      });

    } catch (err) {
      return dispatch({
        type: UserActionTypes.SET_USER_FAILURE,
        payload: null,
      });
    }
  };
};

export const removeUser: ActionCreator<ThunkAction<void,
  ApplicationState,
  User,
  Action<string>>> = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: UserActionTypes.SET_USER,
        payload: null,
      });

    } catch (err) {
      return dispatch({
        type: UserActionTypes.REMOVE_USER_FAILURE,
        payload: null,
      });
    }
  };
};
