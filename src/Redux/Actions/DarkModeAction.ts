import { DarkModeActionTypes, DarkMode } from '../Types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';

export type AppThunk = ThunkAction<void,
  ApplicationState,
  null,
  Action<string>>;

export const toggleDarkMode: ActionCreator<ThunkAction<
  void,
  ApplicationState,
  DarkMode,
  Action<string>
  >> = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: DarkModeActionTypes.TOGGLE_DARK_MODE,
        payload: null,
      });

    } catch (err) {
      return dispatch({
        type: DarkModeActionTypes.TOGGLE_DARK_MODE_FAILURE,
        payload: null,
      })
    }
  };
};