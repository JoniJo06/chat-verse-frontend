import React from 'react'
import { Wrapper } from './Chat.styles';
import {ChatType} from '../../Types'

type Props = {
  chat: ChatType
}

const Chat: React.FC<Props> = ({chat}) => {
  console.log(chat)
  return (
    <Wrapper>

    </Wrapper>
  );
};
export default Chat;