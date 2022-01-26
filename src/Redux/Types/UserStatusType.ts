import { LoginEnum } from '../../Enums';

interface LoginType {
  type: LoginEnum.LOGIN,
  status: string
}

interface LogoutType {
  type: LoginEnum.LOGOUT,
}

export type UserStatusAction = LoginType | LogoutType
