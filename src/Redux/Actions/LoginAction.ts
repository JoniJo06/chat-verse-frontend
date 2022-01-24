import { Dispatch } from 'redux'
import { LoginAction } from '../Types'
import { LoginEnum } from '../../Enums'

export const userLogin = (token: string, status: string) => {
  return (dispatch: Dispatch<LoginAction>) => {
    dispatch({
      type: LoginEnum.LOGIN,
      token: token,
      status: status,
    })
  }
}

export const userLogout = () => {
  return (dispatch: Dispatch<LoginAction>) => {
    dispatch({
      type: LoginEnum.LOGOUT,
    })
  }
}
