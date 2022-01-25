import {LoginAction as Action} from '../Types'
import {LoginEnum} from "../../Enums";

interface LoginState {
    JWTToken: string,
    status: string
}

const reducer = (state: LoginState, action: Action) => {
    if (state === undefined)
        state = {JWTToken : '', status : ''}
    switch(action.type){
        case LoginEnum.LOGOUT:
            return state = {JWTToken: '', status: ''}
        case LoginEnum.LOGIN:
            return state = {JWTToken: action.token, status: action.status}
        default :
            return state;
    }
}

export default reducer;