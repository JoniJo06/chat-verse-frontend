import { SocketActionTypes } from '../Types';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Socket } from 'socket.io-client';
import { ApplicationState } from '../index';
//
// export type AppThunk = ThunkAction<void,
//   ApplicationState,
//   null,
//   Action<string>>;

export const setSocket: ActionCreator<ThunkAction<void,
  ApplicationState,
  Socket,
  Action<string>>> = (socket: Socket) => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: SocketActionTypes.SET_SOCKET,
        payload: socket,
      });

    } catch (err) {
      return dispatch({
        type: SocketActionTypes.SET_SOCKET,
        payload: null,
      });
    }
  };
};

export const removeSocket: ActionCreator<ThunkAction<void,
  ApplicationState,
  Socket,
  Action<string>>> = () => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: SocketActionTypes.REMOVE_SOCKET,
        payload: null,
      });

    } catch (err) {
      return dispatch({
        type: SocketActionTypes.REMOVE_SOCKET_FAILURE,
        payload: null,
      });
    }
  };
};
