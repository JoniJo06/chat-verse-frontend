import React from 'react';
import { Wrapper } from './Chat.styles';
import { ChatType } from '../../Types';
import { useEffect } from 'react';
import { ApplicationState } from '../../Redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Socket } from 'socket.io-client';
import { setSocket } from '../../Redux/Actions';
import { connect } from 'react-redux';


interface MainProps {
  chat: ChatType;
}

interface PropsFromDispatch {
  setSocket: (socket: Socket) => void;
}

interface PropsFromState {
  socket: Socket;
  userToken: string;
}

type AllProps = MainProps & PropsFromDispatch & PropsFromState;

const Chat: React.FC<AllProps> = ({ chat, userToken }) => {

  useEffect(() => {
    // const newSocket = io(
    //   `https://chatverse-test.herokuapp.com/`,
    //  userToken && { query: {userToken } }
    // );
    // console.log(newSocket);
    // setSocket(newSocket);
    // return () => newSocket.close();
  }, [setSocket,userToken]);

  console.log(chat);
  return <Wrapper></Wrapper>;
};

const mapStateToProps = ({ userToken, socket }: ApplicationState) => ({
  userToken: userToken.data.userToken,
  socket: socket.data.socket,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  setSocket: (socket: Socket) => dispatch(setSocket(socket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
