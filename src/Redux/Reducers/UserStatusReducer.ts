import { UserStatusAction as Action } from '../Types';
import { LoginEnum } from '../../Enums';

const reducer = async (state: string, action: Action) => {
  console.log(state);
  if (state === undefined) state = '';
  console.log(state);
  switch (action.type) {
    case LoginEnum.LOGIN:
      return action.status;
    case LoginEnum.LOGOUT:
      return '';
    default:
      return state;
  }
};
export default reducer;
