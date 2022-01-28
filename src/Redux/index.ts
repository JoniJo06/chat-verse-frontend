// export * as actionCreators from './Actions'
import {combineReducers} from 'redux'
import {darkModeReducer, userTokenReducer, userStatusReducer, socketReducer } from './Reducers';

import { DarkModeState, SocketState, UserStatusState, UserTokenState} from './Types';
import { connectRouter, RouterState } from 'connected-react-router';

export interface ApplicationState {
  darkMode: DarkModeState,
  userStatus: UserStatusState,
  userToken: UserTokenState,
  socket: SocketState,
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    darkMode: darkModeReducer,
    userToken: userTokenReducer,
    userStatus: userStatusReducer,
    socket: socketReducer,
    router: connectRouter(history)
  });

// export type RootState = ReturnType<typeof createRootReducer>