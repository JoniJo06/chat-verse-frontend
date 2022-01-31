// export * as actionCreators from './Actions'
import {combineReducers} from 'redux'
import {darkModeReducer, userTokenReducer, userReducer, socketReducer } from './Reducers';

import { DarkModeState, SocketState, UserState, UserTokenState} from './Types';
import { connectRouter, RouterState } from 'connected-react-router';

export interface ApplicationState {
  darkMode: DarkModeState,
  user: UserState,
  userToken: UserTokenState,
  socket: SocketState,
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    darkMode: darkModeReducer,
    userToken: userTokenReducer,
    user: userReducer,
    socket: socketReducer,
    router: connectRouter(history)
  });

// export type RootState = ReturnType<typeof createRootReducer>