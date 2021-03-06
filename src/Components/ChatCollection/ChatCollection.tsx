import React, { useEffect, useState } from 'react';
import { Wrapper, ChatCollectionOptions } from './ChatCollection.styles';
import axios from 'axios';
import { ChatType } from '../../Types';
import { ApplicationState } from '../../Redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setUser, setUserToken } from '../../Redux/Actions';
import { connect } from 'react-redux';
import { ChatCard } from '../index';
import { Socket, User } from '../../Redux/Types';
import { IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


type MainProps = {
  currentChat: ChatType;
  setCurrentChat: (chat: ChatType) => void;
  setFriendsListOpen: (value: boolean) => void
};

interface PropsFromState {
  user: User;
  userToken: string;
}

type AllProps = PropsFromState & MainProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatCollection: React.FC<AllProps> = ({
  userToken,
  currentChat,
  setCurrentChat,
  setFriendsListOpen,
}) => {
  const [chats, setChats] = useState<string[]>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + '/users/all-active-chats', {
          headers: { JWT_TOKEN: userToken },
        })
        .then((res) => setChats(res.data.chats))
        .catch((err) => console.log(err));
    };
    void fetchData();
  }, [currentChat]);



  return (
    <Wrapper>
      <ChatCollectionOptions sx={{justifyContent: 'space-around', alignItems: 'center'}}>
        <Typography variant='h4'>Chats</Typography>
        <Tooltip title='start new chat'>

        <IconButton onClick={() => setFriendsListOpen(true)}>
          <AddIcon color='success'/>
        </IconButton>
        </Tooltip>
      </ChatCollectionOptions>
      {chats?.map((chat_id, i) => {
        return (
          <ChatCard
            setCurrentChat={setCurrentChat}
            active={currentChat.chat_id === chat_id}
            key={i}
            chat_id={chat_id}
          />
        );
      })}
    </Wrapper>
  );
};
const mapStateToProps = ({ user, userToken, socket }: ApplicationState) => ({
  user: user.data,
  userToken: userToken.data.userToken,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setUserToken: (token: string) => dispatch(setUserToken(token)),
    setUserStatus: (status: string) => dispatch(setUser(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatCollection);
