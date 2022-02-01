import React, { useState, useEffect } from 'react';
import {Wrapper} from './ChatCard.styles';
import { ChatType } from '../../Types';
import axios from 'axios';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import {Avatar/*, Typography*/} from '@mui/material'
import {Socket, User} from "../../Redux/Types";
import {createChat} from '../../Socket'
import {} from '@mui/icons-material'

interface PropsFromState {
  userToken: string;
  socket: Socket
  user: User
}

interface MainProps {
  chat_id: string;
  setCurrentChat: Function;
  active: boolean
}

type AllProps = MainProps & PropsFromState

const ChatCard: React.FC<AllProps> = ({ chat_id,setCurrentChat, userToken , socket, user}) => {
  const [chat, setChat] = useState<ChatType>({
    chat_id: '',
    icon: '',
    chat_partner: '',
    name: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(process.env.REACT_APP_BACKEND_URL + `/chats/${chat_id}/info`, { 'headers': { JWT_TOKEN: userToken } })
        .then(res => setChat(res.data))
        .catch(err => console.error(err));
    };
    void fetchData();
  }, []);

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stringAvatar = (name: string) => {
    const twoWords :boolean = name.split(' ').length >= 2;
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 30,
        height: 30,
        mr: '5px',
      },

      children: `${name.split(' ')[0][0]}${twoWords ? name.split(' ')[1][0]: ''}`,
    };
  }

  // @ts-ignore
  return (
    <Wrapper onClick={() => {
      createChat(socket, chat_id, user.user_id)
      console.log(chat)
      setCurrentChat(chat)
    }}>
      {chat?.icon ? (
        <Avatar sx={{ width: 24, height: 24, mr: '5px' }} alt={chat.name} src={chat.icon} />
      ) : (
        <Avatar  {...stringAvatar(chat.name)} />
      )}
      {chat?.name}

    </Wrapper>
  );
};
const mapStateToProps = ({ userToken, socket, user }: ApplicationState) => ({
 userToken: userToken.data.userToken,
  socket: socket.data,
  user: user.data
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);