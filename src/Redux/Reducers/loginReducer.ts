import {LoginAction as Action} from '../Types'
import {LoginEnum} from "../../Enums";

interface LoginState {
    JWTToken: string,
    status: string
}

const reducer = (state: LoginState, action: Action) => {
    switch(action.type){
        case LoginEnum.LOGOUT:
            return {JWTToken: '', status: ''}
        case LoginEnum.LOGIN:
            return {JWTToken: action.token, status: action.status}
        default :
            return state;
    }
}

export default reducer;