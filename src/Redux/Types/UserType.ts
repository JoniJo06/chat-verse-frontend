export interface User {
  status: string
  user_id: string
}

export enum UserActionTypes {
  SET_USER = '@@user/SET_USER',
  SET_USER_FAILURE = '@@user/SET_USER_FAILURE',
  REMOVE_USER = '@@user/REMOVE_USER',
  REMOVE_USER_FAILURE = '@@user/REMOVE_USER_FAILURE'
}

export interface UserState {
  readonly loading: boolean;
  readonly data: User;
  readonly errors?: string;
}
