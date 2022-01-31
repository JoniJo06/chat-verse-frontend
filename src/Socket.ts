import {Socket} from './Redux/Types'


export const createChat = ({socket} :Socket, chat_id:string, user_id:string) => {
  socket.emit('CREATE_ROOM', chat_id, user_id)
}

export const sendSingleMessage = ({socket}: Socket, message: string, chat_id:string, creator: string, timestamp:number, read_status:boolean) => {
  socket.emit('SEND_SINGLE_MESSAGE', {
    message,
    chat_id,
    creator,
    timestamp,
    read_status,
  })
}