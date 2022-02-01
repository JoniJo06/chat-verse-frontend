import {Socket} from './Redux/Types'
import {SingleMessageType} from './Types'


export const createChat = ({socket} :Socket, chat_id:string, user_id:string) => {
  socket.emit('CREATE_ROOM', chat_id, user_id)
}

export const sendSingleMessage = ({socket}: Socket, message: SingleMessageType) => {
  socket.emit('SEND_SINGLE_MESSAGE', {
    message: message.message,
    chat_id: message.chat_id,
    creator: message.creator,
    timestamp: message.timestamp,
    read_status: message.read_status,
  })
}