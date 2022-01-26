import { Dispatch } from 'redux';
import { DarkModeAction as Action } from '../Types';

export { userStatusSet, userStatusRemove } from './UserStatusAction';
export { userLogin, userLogout } from './LoginAction'

export const toggleDarkMode = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: 'toggle',
    });
  };
};