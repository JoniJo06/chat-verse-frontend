import { Socket as Sockets } from 'socket.io-client'
//import { ServerToClientEvents, ClientToServerEvents } from '../../Types'

export interface Socket {
    socket: Sockets
}

export enum SocketActionTypes {
    SET_SOCKET = '@@socket/SET_SOCKET',
    SET_SOCKET_FAILURE = '@@socket/SET_SOCKET_FAILURE',
    REMOVE_SOCKET = '@@socket/REMOVE_SOCKET',
    REMOVE_SOCKET_FAILURE = '@@socket/REMOVE_SOCKET_FAILURE',
}

export interface SocketState {
    readonly loading: boolean;
    readonly data: Socket;
    readonly errors?: string;
}