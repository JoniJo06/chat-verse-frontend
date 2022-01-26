import { Dispatch } from 'redux'
import { TokenAction as Action } from '../Types'
import { LoginEnum } from '../../Enums'

export const userLogin = (token: string) => {
  console.log(token)
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: LoginEnum.LOGIN,
      token: token
    })
  }
}

export const userLogout = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: LoginEnum.LOGOUT,
    })
  }
}
