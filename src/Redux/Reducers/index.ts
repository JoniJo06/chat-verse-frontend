import { combineReducers } from 'redux';
import darkModeReducer from './darkModeReducer';
import tokenReducer from './TokenReducer';
import userStatusReducer from './UserStatusReducer';

const reducers = combineReducers({
  darkMode: darkModeReducer,
  userToken: tokenReducer,
  userStatus: userStatusReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>