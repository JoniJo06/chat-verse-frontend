import React from 'react'
import {Wrapper, MessageContainer} from './SingleMessage.styles'
import { SingleMessageType } from '../../Types';

import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface MainProps {
  me:boolean
  message:SingleMessageType
}



const SingleMessage:React.FC<MainProps> = ({me, message}) => {
  // const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  const date = new Date(message.timestamp).toLocaleString('de-DE')
  return (
    <Wrapper>{
      me ? (
        <MessageContainer id='me'>
          <p>{message.message}</p>
          {/*<div className='status'>*/}
            {/*{!message.read_status ? <DoneIcon/> :<DoneAllIcon/>}*/}
          <p className='timestamp'>{date}</p>
          {/*</div>*/}

        </MessageContainer>
      ):(
        <MessageContainer>
          <p>{message.message}</p>
            <p className='timestamp'>{date}</p>

        </MessageContainer>
      )
    }
    </Wrapper>
  )
}

export default SingleMessage
