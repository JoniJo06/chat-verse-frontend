import React, { FormEvent, useRef, useState } from 'react';
import { Wrapper } from './Chat.styles';
import { ChatType, SingleMessageType } from '../../Types';
import { sendSingleMessage } from '../../Socket';
import { Socket, User } from '../../Redux/Types';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import axios from 'axios';
import InputField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

interface MainProps {
  chat: ChatType;
}

interface PropsFromState {
  socket: Socket;
  user: User;
}

interface PropsFromDispatch {}

type AllProps = MainProps & PropsFromState & PropsFromDispatch;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chat: React.FC<AllProps> = ({ chat, socket, user }) => {
  const [messages, setMessages] = useState<SingleMessageType[]>([]);
  const newMessageRef = useRef(null);
  const handleNewMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const newMessage = newMessageRef.current.value;
    const message: SingleMessageType = {
      message: newMessage,
      chat_id: chat.chat_id,
      creator: user.user_id,
      timestamp: Date.now(),
      read_status: false,
    };

    sendSingleMessage(socket, message);

    setMessages((prev) => [...prev, message]);

    //TODO
    void axios.post(
      String(process.env.REACT_APP_BACKEND_URL + '/single-messages'),
      {
        message,
      }
    );
    // .then(console.log('message sendec'))
    // .catch(err => console.warn(err.message))
    //@ts-ignore
    newMessageRef.current.value = '';
  };
  return (
    <Wrapper>
      {messages?.map((el, i) => {
        return <p key={i}>{el.message}</p>;
      })}
      <form onSubmit={handleNewMessage}>
        <Stack direction='row' spacing={2}>
          <InputField
            fullWidth
            label='new message'
            id='fullWidth'
            ref={newMessageRef}
          />
                <LoadingButton
        onClick={() => console.log('kek')}
        endIcon={<SendIcon />}
        loading={false}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
        </Stack>
      </form>
    </Wrapper>
  );
};
const mapStateToProps = ({ user, socket }: ApplicationState) => ({
  user: user.data,
  socket: socket.data,
});
const mapDispatchProps = () => ({});

export default connect(mapStateToProps, mapDispatchProps)(Chat);
