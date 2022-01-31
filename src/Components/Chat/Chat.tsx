import React, {useRef} from 'react'
import { Wrapper } from './Chat.styles';
import {ChatType} from '../../Types'
import {sendSingleMessage} from '../../Socket'
import { Socket, User} from "../../Redux/Types";
import {ApplicationState} from "../../Redux";
import {connect} from "react-redux";


interface MainProps {
  chat: ChatType
}

interface PropsFromState {
  socket: Socket
  user: User
}

interface PropsFromDispatch {}

type AllProps = MainProps & PropsFromState & PropsFromDispatch

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chat: React.FC<AllProps> = ({chat, socket, user}) => {
  const newMessageRef = useRef()
  const handleNewMessage = () => {
    //@ts-ignore
    const message = newMessageRef.current.value;
    sendSingleMessage(
      socket,
      message,
      chat.chat_id,
      user.user_id,
      Date.now(),
      false
    )
    //@ts-ignore
  newMessageRef.current.value = ''
  }
  return (
    <Wrapper>
      <form onSubmit={handleNewMessage}>
        <input />
      </form>
    </Wrapper>
  );
};
const mapStateToProps = ({ user, socket }: ApplicationState) => ({
  user: user.data,
  socket: socket.data
});
const mapDispatchProps = () => ({})

export default connect(mapStateToProps, mapDispatchProps)(Chat);
