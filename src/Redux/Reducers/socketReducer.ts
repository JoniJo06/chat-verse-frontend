import { SocketActionTypes, SocketState } from '../Types';
import { Reducer } from 'redux';
import { io } from 'socket.io-client';

export const initialState: SocketState = {
  data: {
    socket: io(),
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
          socket: action.payload,
        },
      };
    case SocketActionTypes.REMOVE_SOCKET:
      return {
        error: state.errors,
        loading: state.loading,
        data: {
          socket: io(),
        },
      };
    default:
      return state;
  }
};
export { reducer as socketReducer };