import React, { useState, useEffect } from 'react';
import {} from './ChatCard.styles';
import { ChatType } from '../../Types';
import axios from 'axios';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import {Button} from '@mui/material'
import {Socket, User} from "../../Redux/Types";
import {createChat} from '../../Socket'

interface PropsFromState {
  userToken: string;
  socket: Socket
  user: User
}

interface MainProps {
  chat_id: string;
}

type AllProps = MainProps & PropsFromState

const ChatCard: React.FC<AllProps> = ({ chat_id, userToken , socket, user}) => {
  const [chat, setChat] = useState<ChatType>();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(process.env.REACT_APP_BACKEND_URL + `/chats/${chat_id}/info`, { 'headers': { JWT_TOKEN: userToken } })
        .then(res => setChat(res.data))
        .catch(err => console.error(err));
    };
    void fetchData();
  }, []);


  return (
    <Button onClick={() => createChat(socket, chat_id, user.user_id)}>
      {chat?.name}
    </Button>
  );
};
const mapStateToProps = ({ userToken, socket, user }: ApplicationState) => ({
 userToken: userToken.data.userToken,
  socket: socket.data,
  user: user.data
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);