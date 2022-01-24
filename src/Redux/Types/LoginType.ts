import {LoginEnum} from '../../Enums'

interface LoginType {
    type: LoginEnum.LOGIN,
    token: string,
    status: string
}

interface LogoutType {
    type: LoginEnum.LOGOUT,
}

export type LoginAction = LoginType | LogoutType;