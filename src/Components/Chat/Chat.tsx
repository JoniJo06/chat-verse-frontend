import React, { FormEvent, useState, useRef } from 'react';
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
import { Paper } from '@mui/material';

type MessageFormData = {
  message: string;
};

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
  const [formData, setFormData] = useState<MessageFormData>({ message: '' });
  
  const dummyDiv = useRef(null)
  // const scrollBottom = () => dummyDiv.current.scrolltoBottom

  const handleNewMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    const message: SingleMessageType = {
      message: formData.message,
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
    setFormData((prev) => {
      let temp = prev;
      Object.keys(temp).forEach((param: string) => {
        temp = { ...temp, [param]: '' };
      });
      return temp;
    });
  };

  const handleChange = (e: any) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };



  return (
    <Wrapper>
        <Paper className='messagesContainer'>
          {messages?.map((el, i) => {
            return <h4 key={i}>{el.message}</h4>;
          })}
          <div ref={dummyDiv}></div>
        </Paper>
        <form onSubmit={handleNewMessage}>
          <Stack direction='row' spacing={2}>
            <InputField
              name='message'
              onChange={handleChange}
              value={formData.message}
              fullWidth
              label='new message'
              id='fullWidth'
            />
            <LoadingButton
              type='submit'
              endIcon={<SendIcon />}
              loading={false}
              loadingPosition='end'
              variant='contained'
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
