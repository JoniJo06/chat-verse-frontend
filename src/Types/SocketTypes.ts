import {SingleMessageType} from "../Types";

// const test = EV

export type ServerToClientEvents = {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  RECEIVE_SINGLE_MESSAGE: (message: SingleMessageType) => void;
  JOINED_ROOM: (chat_id: string) => void
};

export interface ClientToServerEvents {
  hello: () => void;
  connect: () => void;
  SEND_SINGLE_MESSAGE: (message: SingleMessageType) => void
  JOIN_ROOM: (chat_id: string) => void
  CREATE_ROOM: (chat_id: string, user_id: string) => void
}
