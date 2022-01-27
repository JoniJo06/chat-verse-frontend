import React, { useState, useEffect } from 'react';
import { Wrapper } from './ChatCard.styles';
import { ChatType } from '../../Types';
import axios from 'axios';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';

interface PropsFromState {
  userToken: string;
  userTokenLoading: boolean;
}

interface MainProps {
  chat_id: string;
}

type AllProps = MainProps & PropsFromState

const ChatCard: React.FC<AllProps> = ({ chat_id, userToken }) => {
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
    <Wrapper>
      {chat?.name}
    </Wrapper>
  );
};
const mapStateToProps = ({ userToken }: ApplicationState) => ({
  userToken: userToken.data.userToken,
  userTokenLoading: userToken.loading,
});

const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);