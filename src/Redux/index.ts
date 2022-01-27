// export * as actionCreators from './Actions'
import {combineReducers} from 'redux'
import {darkModeReducer, userTokenReducer, userStatusReducer} from './Reducers';

import { DarkModeState } from './Types'
import { UserStatusState } from './Types'
import { UserTokenState } from './Types'
import { connectRouter, RouterState } from 'connected-react-router';

export interface ApplicationState {
  darkMode: DarkModeState,
  userStatus: UserStatusState,
  userToken: UserTokenState,
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    darkMode: darkModeReducer,
    userToken: userTokenReducer,
    userStatus: userStatusReducer,
    router: connectRouter(history)
  });

// export type RootState = ReturnType<typeof createRootReducer>