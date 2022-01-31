import { SocketActionTypes, SocketState} from '../Types';
import { Reducer } from 'redux';
import { io } from 'socket.io-client';
import {Socket} from "socket.io-client";
import {ServerToClientEvents, ClientToServerEvents} from "../../Types";

export const initialState: SocketState = {
  data: {
    socket: {} as Socket<ServerToClientEvents , ClientToServerEvents>,
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<SocketState> = (
  state: SocketState = initialState,
  action
) => {
  switch (action.type) {
    case SocketActionTypes.SET_SOCKET:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          socket: state.data.socket = io(String(process.env.REACT_APP_SOCKET_URL), { query: {user_id: action.payload.user_id}}),
        },
      };
    case SocketActionTypes.SET_SOCKET_FAILURE:
      console.error(action.payload)
      return state
    case SocketActionTypes.REMOVE_SOCKET:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          socket: state.data.socket = io(),
        },
      };
    case SocketActionTypes.REMOVE_SOCKET_FAILURE:
      console.error(action.payload)
      return state;
    default:
      return state;
  }
};
export { reducer as socketReducer };