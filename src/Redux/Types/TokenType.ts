import { LoginEnum } from '../../Enums';

interface LoginType {
  type: LoginEnum.LOGIN,
  token: string,

}

interface LogoutType {
  type: LoginEnum.LOGOUT,
}

export type TokenAction = LoginType | LogoutType;
