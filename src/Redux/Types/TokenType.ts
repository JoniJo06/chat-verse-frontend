export interface UserToken {
  userToken: string
}

export enum UserTokenActionTypes {
  SET_TOKEN = '@@userToken/SET_TOKEN',
  SET_TOKEN_FAILURE = '@@userToken/SET_TOKEN_FAILURE',
  REMOVE_TOKEN = '@@userToken/REMOVE_TOKEN',
  REMOVE_TOKEN_FAILURE = '@@userToken/REMOVE_TOKEN_FAILURE',
}

export interface UserTokenState {
  readonly loading: boolean;
  readonly data: UserToken;
  readonly errors?: string;
}