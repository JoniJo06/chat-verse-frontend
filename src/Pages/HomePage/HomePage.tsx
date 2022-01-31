//Styles
import React, { useEffect, useState } from 'react';
import { Wrapper } from './HomePage.styles';
import { ChatCollection, TopicCollection, Chat } from '../../Components';
// import { RootState } from '../../Redux/Reducers';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChatType } from '../../Types';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import { Socket, User } from "../../Redux/Types";

interface PropsFromState {
  user: User;
  userToken: string
  socket: Socket
}

// interface PropsFromDispatch {
//   setUserToken: (token: string) => void;
//   setUserStatus: (status: string) => void;
// }

type AllProps = PropsFromState

const HomePage: React.FC<AllProps> = ({ user/*, socket*//*, userToken*/}) => {
  const [access, setAccess] = useState(true);
  const [currentChat, setCurrentChat] = useState<ChatType>({
    chat_id: '',
    icon: '',
    name: '',
    chat_partner: '',
  });
  const navigate = useNavigate();
// console.log(socket)
  // console.log(userToken)

  useEffect(() => {
    const fn = async () => {
      if (!user.status)
        navigate('/login');
      else
        setAccess(true);
    };
    void fn();
  }, []);
  return (
    <React.Fragment>
      {access && (
        <Wrapper>
          <TopicCollection />
          <Chat chat={currentChat} />
          <ChatCollection chat={currentChat} setChat={setCurrentChat} />
        </Wrapper>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = ({ user, userToken, socket }: ApplicationState) => ({
  user: user.data,
  userToken: userToken.data.userToken,
  socket : socket.data
});

const mapDispatchProps = () => ({});
export default connect(mapStateToProps, mapDispatchProps)(HomePage);
