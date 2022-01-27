export interface UserStatus {
  userStatus: string
}

export enum UserStatusActionTypes {
  SET_STATUS = '@@userStatus/SET_STATUS',
  SET_STATUS_FAILURE = '@@userStatus/SET_STATUS_FAILURE',
  REMOVE_STATUS = '@@userStatus/REMOVE_STATUS',
  REMOVE_STATUS_FAILURE = '@@userStatus/REMOVE_STATUS_FAILURE'
}

export interface UserStatusState {
  readonly loading: boolean;
  readonly data: UserStatus;
  readonly errors?: string;
}
