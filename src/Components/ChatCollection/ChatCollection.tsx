import React, { useEffect, useState } from 'react';
import { Wrapper } from './ChatCollection.styles';
import axios from 'axios';
import { ChatType } from '../../Types';
import { ApplicationState } from '../../Redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setUserStatus, setUserToken } from '../../Redux/Actions';
import { connect } from 'react-redux';
import { ChatCard } from '../index';

type MainProps = {
  chat: ChatType;
  setChat: (chat: ChatType) => void;
};

interface PropsFromState {
  userStatus: string;
  userStatusLoading: boolean;
  userToken: string;
  userTokenLoading: boolean;
}

type AllProps = PropsFromState & MainProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatCollection: React.FC<AllProps> = ({ userToken, chat, setChat }) => {
  const [chats, setChats] = useState<string[]>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + '/users/allactivechats', {
          headers: { JWT_TOKEN: userToken },
        })
        .then((res) => setChats(res.data.chats))
        .catch((err) => console.log(err));
    };    void fetchData();
  }, []);

  return (
    <Wrapper>
      {chats?.map((el, i) => {
        return <ChatCard key={i} chat_id={el} />;
      })}
    </Wrapper>
  );
};
const mapStateToProps = ({ userStatus, userToken }: ApplicationState) => ({
  userStatus: userStatus.data.userStatus,
  userStatusLoading: userStatus.loading,
  userToken: userToken.data.userToken,
  userTokenLoading: userToken.loading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setUserToken: (token: string) => dispatch(setUserToken(token)),
    setUserStatus: (status: string) => dispatch(setUserStatus(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatCollection);
