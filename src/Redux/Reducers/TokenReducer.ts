import { TokenAction as Action } from '../Types';
import { LoginEnum } from '../../Enums';

const reducer = async (state: string, action: Action) => {
  if (state === undefined) state = '';

  switch (action.type) {
    case LoginEnum.LOGIN:
      return action.token;
    case LoginEnum.LOGOUT:
      return '';
    default:
      return state;
  }
};

export default reducer;
