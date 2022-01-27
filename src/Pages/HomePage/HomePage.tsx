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

interface PropsFromState {
  userStatus: string;
  userStatusLoading: boolean;
  errors?: string;
}

// interface PropsFromDispatch {
//   setUserToken: (token: string) => void;
//   setUserStatus: (status: string) => void;
// }

type AllProps = PropsFromState

const HomePage: React.FC<AllProps> = ({userStatus}) => {
  const [access, setAccess] = useState(true);
  const [currentChat, setCurrentChat] = useState<ChatType>({
    chat_id: '',
    icon: '',
    name: '',
    chat_partner: '',
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fn = async () => {
      if (!userStatus)
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
const mapStateToProps = ({ userStatus }: ApplicationState) => ({
  userStatus: userStatus.data.userStatus,
  userStatusLoading: userStatus.loading,
});

const mapDispatchProps = () => ({});
export default connect(mapStateToProps, mapDispatchProps)(HomePage);
