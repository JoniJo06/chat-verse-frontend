import { Dispatch } from 'redux';
import { UserStatusAction as Action } from '../Types';
import { LoginEnum } from '../../Enums';

export const userStatusSet = (status: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: LoginEnum.LOGIN,
      status: status,
    });
  };
};

export const userStatusRemove = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: LoginEnum.LOGOUT,
    });
  };
};