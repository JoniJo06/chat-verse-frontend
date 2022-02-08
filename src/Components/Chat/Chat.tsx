import React, { FormEvent, useEffect, useRef, useState } from 'react';
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
  userToken: string;
}

interface PropsFromDispatch {
}

type AllProps = MainProps & PropsFromState & PropsFromDispatch;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chat: React.FC<AllProps> = ({ chat, socket, user, userToken }) => {
  const [ messages, setMessages ] = useState<SingleMessageType[]>([]);
  const [ formData, setFormData ] = useState<MessageFormData>({ message: '' });

  const messagesEndRef = useRef(null);
  const scrollBottom = () => {
    //@ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chat?.chat_id) {
      axios(process.env.REACT_APP_BACKEND_URL + '/single-messages/chat/' + chat.chat_id, {
        headers: { JWT_TOKEN: userToken },
      })
        .then(({ data }) => setMessages(data))
        .catch(err => console.error({ err }));

    }
  }, [ chat ]);

  useEffect(() => {
    if(socket){
      socket.socket.on('RECEIVE_SINGLE_MESSAGE', ({
                                                    message,
                                                    chat_id,
                                                    creator,
                                                    timestamp,
                                                    read_status,
                                                  }) => {
        setMessages((prev: SingleMessageType[]) => {
          return [ ...prev, { message, chat_id, creator, timestamp, read_status } ];
        });
      });
    }
  }, [ socket.socket ]);

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
    setMessages((prev) => [ ...prev, message ]);
    //TODO
    void axios.post(
      process.env.REACT_APP_BACKEND_URL + '/single-messages',
      {
        message,
      },
    );
    setFormData((prev) => {
      let temp = prev;
      Object.keys(temp)
        .forEach((param: string) => {
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

  useEffect(scrollBottom, [ messages ]);

  return (
    <Wrapper>
      <Paper className='messagesContainer'>
        {messages?.map((el, i) => {
          return <h4 key={i}>{el.message}</h4>;
        })}
        <div ref={messagesEndRef}></div>
      </Paper>
      <form
        onSubmit={(e) => {
          handleNewMessage(e);
          scrollBottom();
        }}
      >
        <Stack direction='row' spacing={2}>
          <InputField
            name='message' onChange={handleChange} value={formData.message} fullWidth label='new message' id='fullWidth'
          />
          <LoadingButton
            type='submit'
            endIcon={<SendIcon />}
            loading={false}
            loadingPosition='end'
            variant='contained'
            onClick={scrollBottom}
            disabled={!chat.chat_id}
          >
            Send
          </LoadingButton>
        </Stack>
      </form>
    </Wrapper>
  );
};
const mapStateToProps = ({ user, socket, userToken }: ApplicationState) => ({
  user: user.data,
  socket: socket.data,
  userToken: userToken.data.userToken,
});
const mapDispatchProps = () => ({});

export default connect(mapStateToProps, mapDispatchProps)(Chat);
