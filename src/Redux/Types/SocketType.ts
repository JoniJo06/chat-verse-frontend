<<<<<<< HEAD
import { Socket as Sockets } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../../Types'

export interface Socket {
    socket: Sockets<ServerToClientEvents, ClientToServerEvents>
}
=======
import { Socket } from 'socket.io-client';
interface Sockets{socket: Socket}
>>>>>>> 5101dd1e9ec62be26d5a12fdbf0fdcbd9f49806c

export enum SocketActionTypes {
    SET_SOCKET = '@@socket/SET_SOCKET',
    SET_SOCKET_FAILURE = '@@socket/SET_SOCKET_FAILURE',
    REMOVE_SOCKET = '@@socket/REMOVE_SOCKET',
    REMOVE_SOCKET_FAILURE = '@@socket/REMOVE_SOCKET_FAILURE',
}

export interface SocketState {
    readonly loading: boolean;
    readonly data: Sockets;
    readonly errors?: string;
}